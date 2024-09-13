// stateManagement.js
import { useState, useEffect } from 'react';

export const useWordTableState = (defaultValues, words) => {
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

    useEffect(() => {
        setNewWord(defaultValues);
    }, [defaultValues]);

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



    return {
        editableWord,
        setEditableWord,
        newWord,
        setNewWord,
        showNewWordRow,
        setShowNewWordRow,
        emptyFields,
        setEmptyFields,
        saveButtonDisabled,
        setSaveButtonDisabled,
        updateEmptyFields,
        handleChangeClick,
        handleSaveNewWordClick,
        handleAddClick,
        handleCancelClick,
        handleDeleteClick,
        handleEditClick,
    };
};
