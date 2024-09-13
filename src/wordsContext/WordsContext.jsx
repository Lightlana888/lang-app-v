import React, { createContext, useState, useEffect } from 'react';
import Loading from '../components/loading/Loading';
import ErrorComponent from '../components/error/ErrorComponent';

export const WordsContext = createContext();


export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchWords = () => {
        fetch('/api/words')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong ...');
                }
                return response.json();
            })
            .then(data => {
                setWords(data);

                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error)
            });
    };


    const addWord = (newWord) => {

        fetch('/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWord),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add word');
                }
                return response.json();
            })
            .then(data => {
                setWords(prevWords => [...prevWords, data]);
            })
            .catch(error => console.error('Error adding word:', error));
    };


    const updateWord = (id, updatedWord) => {

        fetch(`/api/words/${updatedWord.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWord),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update word');
                }
                return response.json();
            })
            .then(data => {

                setWords(prevWords => {
                    const index = prevWords.findIndex(word => word.id === id);
                    if (index !== -1) {
                        const updatedWords = [...prevWords];
                        updatedWords[index] = data;
                        return updatedWords;
                    }
                    return prevWords;
                });
            })
            .catch(error => console.error('Error updating word:', error));
    };


    const deleteWord = (id) => {

        fetch(`/api/words/${id}/delete`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete word');
                }
            })
            .then(() => {

                setWords(prevWords => prevWords.filter(word => word.id !== id));
            })
            .catch(error => console.error('Error deleting word:', error));
    };


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            fetchWords();

        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <WordsContext.Provider
            value=
            {{
                words: words,
                fetchWords: fetchWords,
                loading,
                error,
                addWord,
                updateWord,
                deleteWord
            }}>

            {error ? (
                <ErrorComponent message="Похоже произошла ошибка загрузки данных с сервера. Пожалуйста, повторите попытку позже..." />
            ) : (

                loading ? <Loading /> : children
            )}
        </WordsContext.Provider>
    );
};
