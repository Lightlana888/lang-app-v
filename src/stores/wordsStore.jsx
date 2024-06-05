import { makeAutoObservable, runInAction } from 'mobx';

class WordsStore {
    words = [];
    loading = true;
    error = null;
    addError = null;
    updateError = null;
    deleteError = null;



    resetErrors = () => {
        this.error = null;
        this.addError = null;
        this.updateError = null;
        this.deleteError = null;
    }

    constructor() {
        makeAutoObservable(this, {
            fetchWords: false,
            addWord: false,
            updateWord: false,
            deleteWord: false
        });
        this.fetchWords();
    }

    fetchWords = () => {
        this.loading = true;
        fetch('/api/words')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong ...');
                }
                return response.json();
            })
            .then(data => {
                runInAction(() => {
                    this.words = data;
                    this.loading = false;
                    this.error = null;
                });
            })
            .catch(error => {
                runInAction(() => {
                    console.error(error);

                    this.loading = false;
                });
            });
    }

    addWord = (newWord) => {
        return fetch('/api/words/add', {
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
                runInAction(() => {
                    this.words.push(data);
                    this.addError = null;
                });
            })
            .catch(error => {
                console.error('Error adding word:', error);
                runInAction(() => {
                    this.addError = 'Ошибка при добавлении слова: ' + error.message;
                });
                throw error;
            });
    }

    updateWord = (id, updatedWord) => {
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
                runInAction(() => {
                    const index = this.words.findIndex(word => word.id === id);
                    if (index !== -1) {
                        this.words[index] = data;
                    }
                    this.error = null;
                });
            })
            .catch(error => {
                console.error('Error updating word:', error);
                runInAction(() => {
                    this.updateError = 'Ошибка при редактировании слова: ' + error.message;
                });

            });
    }

    deleteWord = (id) => {
        fetch(`/api/words/${id}/delete`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete word');
                }
            })
            .then(() => {
                runInAction(() => {
                    this.words = this.words.filter(word => word.id !== id);
                    this.error = null;
                });
            })
            .catch(error => {
                console.error('Error deleting word:', error);
                runInAction(() => {
                    this.deleteError = 'Ошибка при удалении слова:' + error.message;
                });

            });
    }
}

const wordsStore = new WordsStore();
export default wordsStore;
