import React, { useState, useEffect, useContext } from 'react';
import Button from '../buttons/Button';
import styles from './wordTable.module.css';
import buttonStyles from '../buttons/Button.module.css';
import { WordsContext } from '../../wordsContext/WordsContext';

function WordTable({ defaultValues }) {
    const { words, addWord, updateWord, deleteWord } = useContext(WordsContext);
    const [editableWord, setEditableWord] = useState(null);
    const [newWord, setNewWord] = useState(defaultValues);
    const [showNewWordRow, setShowNewWordRow] = useState(false);
    const [emptyFields, setEmptyFields] = useState({
        english: false,
        transcription: false,
        russian: false,
        tags: false,
    });
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

    const isLatin = (value) => /^[a-zA-Z\s[\],.:'"]*$/.test(value);
    const isCyrillic = (value) => /^[а-яА-ЯёЁ\s,.:'"]*$/.test(value);


    const updateEmptyFields = () => {
        if (!newWord) return;

        const updatedEmptyFields = {
            english: !newWord.english,
            transcription: !newWord.transcription,
            russian: !newWord.russian,
            tags: !newWord.tags,
        };
        setEmptyFields(updatedEmptyFields);
    };

    const validateInput = (value, fieldType) => {
        if (fieldType === 'english') {
            return isLatin(value);
        } else if (fieldType === 'russian') {
            return isCyrillic(value);
        } else {
            return true;
        }
    };

    useEffect(() => {
        setNewWord(defaultValues);
    }, [defaultValues]);

    const handleEditClick = (index) => {
        setEditableWord(index);
        setNewWord(words[index]);
    };

    const handleSaveClick = (index) => {
        updateWord(index, newWord);
        setEditableWord(null);
    };

    const handleCancelClick = () => {
        setEditableWord(null);
        setNewWord(defaultValues);
        setShowNewWordRow(false);
    };

    const handleDeleteClick = (wordId) => {
        deleteWord(wordId);
    };

    const handleAddClick = () => {
        setShowNewWordRow(true);
        setNewWord(defaultValues);
    };

    const handleChangeClick = (e, field) => {
        const { value } = e.target;


        if (newWord && typeof newWord === 'object') {
            const isEmpty = Object.values(newWord).some(value => value === '');
            setSaveButtonDisabled(isEmpty);
        }

        if (validateInput(value, field)) {
            setNewWord(prevState => ({
                ...prevState,
                [field]: value
            }));
        } else {
            alert(`Некорректные символы в поле ${field} Пожалуйста, введите корректные символы`);
            return;
        }

        updateEmptyFields();
    };


    const handleSaveNewWordClick = () => {
        updateEmptyFields();
        if (!newWord.english || !newWord.transcription || !newWord.russian || !newWord.tags) {
            setSaveButtonDisabled(true);
            console.log("Some fields are empty!");
        } else {
            addWord(newWord);
            setShowNewWordRow(false);
            setSaveButtonDisabled(false);
            console.log("New word saved successfully:", newWord);
        }
    };

    return (
        <div className={styles.wordTableContainer}>
            <div className={styles.wordTable}>
                <div className={styles.wordTableTitle}>
                    <h1>Список слов</h1>
                    <Button className={buttonStyles.addButton} onClick={handleAddClick} buttonText="Добавить слово" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Английское слово</th>
                            <th>Транскрипция</th>
                            <th>Русское слово</th>
                            <th>Теги</th>
                            <th colSpan="2">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showNewWordRow && (
                            <tr>
                                <td><input
                                    id='englishInput'
                                    name='english'
                                    className={emptyFields.english ? styles.redBorder : ''}
                                    value={newWord?.english || ''}
                                    onChange={(e) => handleChangeClick(e, 'english')}
                                    autoFocus />
                                </td>
                                <td><input
                                    id='transcriptionInput'
                                    name='transcription'
                                    className={emptyFields.transcription ? styles.redBorder : ''}
                                    value={newWord?.transcription || ''}
                                    onChange={(e) => handleChangeClick(e, 'transcription')} />
                                </td>
                                <td><input
                                    id='russianInput'
                                    name='russian'
                                    className={emptyFields.russian ? styles.redBorder : ''}
                                    value={newWord?.russian || ''}
                                    onChange={(e) => handleChangeClick(e, 'russian')} />
                                </td>
                                <td><input
                                    id='tagsInput'
                                    name='tags'
                                    className={emptyFields.tags ? styles.redBorder : ''}
                                    value={newWord?.tags || ''}
                                    onChange={(e) => handleChangeClick(e, 'tags')} />
                                </td>
                                <td><Button className={buttonStyles.saveButton} onClick={handleSaveNewWordClick} buttonText="Сохранить" disabled={saveButtonDisabled} /></td>
                                <td><Button className={buttonStyles.cancelButton} onClick={handleCancelClick} buttonText="Отмена" /></td>
                            </tr>
                        )}
                        {words.map((word, index) => (
                            <tr key={index}>
                                {editableWord === index ? (
                                    <>
                                        <td><input value={newWord.english} onChange={(e) => handleChangeClick(e, 'english')} autoFocus /></td>
                                        <td><input value={newWord.transcription} onChange={(e) => handleChangeClick(e, 'transcription')} /></td>
                                        <td><input value={newWord.russian} onChange={(e) => handleChangeClick(e, 'russian')} /></td>
                                        <td><input value={newWord.tags} onChange={(e) => handleChangeClick(e, 'tags')} /></td>
                                        <td><Button className={buttonStyles.saveButton} onClick={() => handleSaveClick(index)} buttonText="Сохранить" /></td>
                                        <td><Button className={buttonStyles.cancelButton} onClick={handleCancelClick} buttonText="Отмена" /></td>
                                    </>
                                ) : (
                                    <>
                                        <td>{word.english}</td>
                                        <td>{word.transcription}</td>
                                        <td>{word.russian}</td>
                                        <td>{word.tags}</td>
                                        <td><Button className={buttonStyles.editButton} onClick={() => handleEditClick(index)} buttonText="Редактировать" /></td>
                                        <td><Button className={buttonStyles.deleteButton} onClick={() => handleDeleteClick(word.id)} buttonText="Удалить" /></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WordTable;
