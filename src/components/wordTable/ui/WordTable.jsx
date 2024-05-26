import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Button from '../../../components/buttons/Button';
import styles from '../ui/wordTable.module.css';
import buttonStyles from '../../buttons/Button.module.css';
import wordsStore from '../../../stores/wordsStore';
import ErrorComponent from '../../error/ErrorComponent';


const WordTable = observer(() => {


    const [editableWord, setEditableWord] = useState(null);
    const [newWord, setNewWord] = useState(null);
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


    useEffect(() => {
        setNewWord({});
    }, []);

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

    const handleEditClick = (index) => {
        const wordToEdit = wordsStore.words[index];
        setEditableWord(index);
        setNewWord({ ...wordToEdit });

    };

    const handleSaveClick = (index) => {
        wordsStore.updateWord(index, newWord);
        setEditableWord(null);
    };

    const handleCancelClick = () => {
        setEditableWord(null);
        setShowNewWordRow(false);
        setNewWord({});
    };

    const handleDeleteClick = (wordId) => {
        wordsStore.deleteWord(wordId);
    };

    const handleAddClick = () => {
        setShowNewWordRow(true);
        setNewWord({});
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
            wordsStore.addWord(newWord)
                .then(() => {
                    setSaveButtonDisabled(false);
                    console.log("New word saved successfully:", newWord);
                    setShowNewWordRow(false);
                    setNewWord({});
                })
                .catch(error => {
                    console.log('Failed to save new word:', newWord);
                    setSaveButtonDisabled(true);
                });
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
                        {wordsStore.words.map((word, index) => (
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
});

export default WordTable;
