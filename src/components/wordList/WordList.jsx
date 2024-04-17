import React, { useState, useEffect } from 'react';
import WordCard from '../wordCard/WordCard';
import styles from './wordList.module.css';
import data from '../../data/data.json';
import Button from '../buttons/Button';
import buttonStyles from '../buttons/Button.module.css';


function WordList({ initialIndex }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
    const words = data.words;

    const handleNextWord = () => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % words.length);
    };

    const handlePrevWord = () => {
        setCurrentIndex((currentIndex) => (currentIndex - 1 + words.length) % words.length);
    };

    useEffect(() => {
        if (initialIndex !== undefined && initialIndex !== currentIndex) {
            setCurrentIndex(initialIndex);
        }
    }, [initialIndex, currentIndex]);

    return (
        <div className={styles.wordList}>
            <Button className={buttonStyles.buttonPrev} onClick={handlePrevWord} buttonText="←"></Button>

            <WordCard key={currentIndex} word={words[currentIndex]} />
            <Button className={buttonStyles.buttonNext} onClick={handleNextWord} buttonText="→"></Button>
        </div >
    );
}

export default WordList;
