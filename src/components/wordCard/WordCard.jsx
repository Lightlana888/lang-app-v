import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './wordCard.module.css';
import Button from '../buttons/Button';
import buttonStyles from '../buttons/Button.module.css';

function WordCard({ word }) {
    const [showTranslation, setShowTranslation] = useState(false);

    const handleShowTranslation = () => {
        setShowTranslation(true);
    };

    return (
        <div className={styles.pageCenter}>

            {word && (
                <>
                    <motion.div
                        className={styles.wordCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.wordBlock}>
                            <div className={styles.word}>{word.english.charAt(0).toUpperCase() + word.english.slice(1)}</div>
                            <div className={styles.transcription}>{word.transcription}</div>
                        </div>
                        {showTranslation
                            ? (<div className={styles.translation}>{word.russian.charAt(0).toUpperCase() + word.russian.slice(1)}</div>)
                            : (<Button className={buttonStyles.checkButton} onClick={handleShowTranslation} buttonText="Проверить"></Button>)}
                    </motion.div>
                </>
            )}
        </div>

    );
}

export default WordCard;
