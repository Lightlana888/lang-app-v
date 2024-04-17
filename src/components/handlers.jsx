export function handleAdd(setShowNewWordRow, setNewWord) {
    setShowNewWordRow(true);
    const newWordObject = {
        english: '',
        transcription: '',
        russian: '',
        tags: ''
    };
    setNewWord(newWordObject);
};

export function handleCancel(setEditableWord, setNewWord) {
    setEditableWord(null);
    setNewWord({});
};

export function handleChange(e, field, setNewWord, newWord) {
    const updatedWord = { ...newWord, [field]: e.target.value };
    setNewWord(updatedWord);
};

export function handleDelete(wordId, wordsDataState, setWordsDataState) {
    const updatedWords = wordsDataState.words.filter(word => word.id !== wordId);

    setWordsDataState({ ...wordsDataState, words: updatedWords });
    console.log('Удаление слова с ID:', wordId);
};

export function handleEdit(setEditableWord, setNewWord, wordsDataState, index) {
    setEditableWord(index);
    setNewWord(wordsDataState.words[index]);
};

export function handleSave(index, wordsDataState, newWord, setWordsDataState, setEditableWord, setNewWord) {
    const updatedWords = [...wordsDataState.words];
    updatedWords[index] = newWord;
    setWordsDataState({ ...wordsDataState, words: updatedWords });
    setEditableWord(null);
    setNewWord({});
};

export function handleSaveNewWord(wordsDataState, newWord, setWordsDataState, setShowNewWordRow, setNewWord) {
    const updatedWords = [...wordsDataState.words, newWord];
    setWordsDataState({ ...wordsDataState, words: updatedWords });
    setShowNewWordRow(false);
    setNewWord({});
};


