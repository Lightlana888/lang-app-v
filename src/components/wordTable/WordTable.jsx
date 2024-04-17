import React, { useState, useEffect } from 'react';
import wordsData from '../../data/data.json';
import Button from '../buttons/Button';
import styles from './wordTable.module.css';
import buttonStyles from '../buttons/Button.module.css';
import { handleAdd, handleCancel, handleChange, handleDelete, handleEdit, handleSave, handleSaveNewWord } from '../handlers';



function WordTable({ defaultValues }) {
    const [editableWord, setEditableWord] = useState(null);
    const [newWord, setNewWord] = useState(defaultValues);
    const [wordsDataState, setWordsDataState] = useState(wordsData);
    const [showNewWordRow, setShowNewWordRow] = useState(false);

    useEffect(() => {

        localStorage.setItem('wordsData', JSON.stringify(wordsDataState));
    }, [wordsDataState]);

    useEffect(() => {

        setNewWord(defaultValues);
    }, [defaultValues]);


    const handleEditClick = (index) => {
        handleEdit(setEditableWord, setNewWord, wordsDataState, index);
    };

    const handleSaveClick = (index) => {
        handleSave(index, wordsDataState, newWord, setWordsDataState, setEditableWord, setNewWord);
    }

    const handleCancelClick = () => {
        handleCancel(setEditableWord, setNewWord);
        setShowNewWordRow(false);
    }

    const handleDeleteClick = (wordId) => {
        handleDelete(wordId, wordsDataState, setWordsDataState)
        console.log('Удаление слова с ID:', wordId);
    }

    const handleAddClick = () => {
        handleAdd(setShowNewWordRow, setNewWord);
    }

    const handleChangeClick = (e, field) => {
        handleChange(e, field, setNewWord, newWord);
    }

    const handleSaveNewWordClick = () => {
        handleSaveNewWord(wordsDataState, newWord, setWordsDataState, setShowNewWordRow, setNewWord)
    }

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
                                <td><input value={newWord.english} onChange={(e) => handleChangeClick(e, 'english')} autoFocus /></td>
                                <td><input value={newWord.transcription} onChange={(e) => handleChangeClick(e, 'transcription')} /></td>
                                <td><input value={newWord.russian} onChange={(e) => handleChangeClick(e, 'russian')} /></td>
                                <td><input value={newWord.tags} onChange={(e) => handleChangeClick(e, 'tags')} /></td>
                                <td><Button className={buttonStyles.saveButton} onClick={handleSaveNewWordClick} buttonText="Сохранить" /></td>
                                <td><Button className={buttonStyles.cancelButton} onClick={handleCancelClick} buttonText="Отмена" /></td>
                            </tr>
                        )}
                        {wordsDataState.words.map((word, index) => (
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
