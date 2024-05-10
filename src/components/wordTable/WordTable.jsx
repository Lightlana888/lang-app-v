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
    const isLatin = (value) => /^[a-zA-Z\s]*$/.test(value);
    const isCyrillic = (value) => /^[а-яА-ЯёЁ\s]*$/.test(value);

    const [emptyFields, setEmptyFields] = useState({
        english: false,
        transcription: false,
        russian: false,
        tags: false,
    });

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

    const updateEmptyFields = () => {
        if (newWord) {
            const updatedEmptyFields = {
                english: !newWord.english,
                transcription: !newWord.transcription,
                russian: !newWord.russian,
                tags: !newWord.tags,
            };
            setEmptyFields(updatedEmptyFields);
        }
    };

    const validateInput = (value, fieldType) => {
        if (fieldType === 'english') {
            return isLatin(value);
        } else if (fieldType === 'russian') {
            return isCyrillic(value);
        } else if (fieldType === 'transcription') {
            return isLatin(value);
        } else {
            return true;
        }
    };

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
        setSaveButtonDisabled(true);
        handleAdd(setShowNewWordRow, setNewWord);
    }

    const handleChangeClick = (e, field) => {
        const { value } = e.target;
        if (validateInput(value, field)) {
            handleChange(e, field, setNewWord, newWord);
        } else {
            alert(`Некорректные символы в поле ${field} Пожалуйста, введите корректные символы`);
            return;
        }

        updateEmptyFields();
        console.log("Empty fields after change:", emptyFields);
        const isEmpty = Object.values(newWord).some(value => value === '');
        setSaveButtonDisabled(isEmpty);
    };

    const handleSaveNewWordClick = () => {
        updateEmptyFields();
        if (!newWord.english || !newWord.transcription || !newWord.russian || !newWord.tags) {
            setSaveButtonDisabled(true);
            console.log("Some fields are empty!");
        } else {
            handleSaveNewWord(wordsDataState, newWord, setWordsDataState, setShowNewWordRow, setNewWord);
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
                                    value={newWord.english}
                                    onChange={(e) => handleChangeClick(e, 'english')}
                                    autoFocus />
                                </td>
                                <td><input
                                    id='transcriptionInput'
                                    name='transcription'
                                    className={emptyFields.transcription ? styles.redBorder : ''}
                                    value={newWord.transcription}
                                    onChange={(e) => handleChangeClick(e, 'transcription')} />
                                </td>
                                <td><input
                                    id='russianInput'
                                    name='russian'
                                    className={emptyFields.russian ? styles.redBorder : ''}
                                    value={newWord.russian}
                                    onChange={(e) => handleChangeClick(e, 'russian')} />
                                </td>
                                <td><input
                                    id='tagsInput'
                                    name='tags'
                                    className={emptyFields.tags ? styles.redBorder : ''}
                                    value={newWord.tags}
                                    onChange={(e) => handleChangeClick(e, 'tags')} />
                                </td>
                                <td><Button className={buttonStyles.saveButton} onClick={handleSaveNewWordClick} buttonText="Сохранить" disabled={saveButtonDisabled} /></td>
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
