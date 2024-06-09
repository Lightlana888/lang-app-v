import { makeAutoObservable, runInAction } from 'mobx';

const baseUrl = 'https://itgirlschool.justmakeit.ru';

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

    fetchWords = async () => {
        this.loading = true;
        try {
            const response = await fetch(`${baseUrl}/api/words`);
            if (!response.ok) {
                throw new Error('Something went wrong ...');
            }
            const data = await response.json();
            runInAction(() => {
                this.words = data;
                this.loading = false;
                this.error = null;
            });
        } catch (error) {
            runInAction(() => {
                console.error(error);
                this.loading = false;
                this.error = error.message;
            });
        }
    }

    addWord = async (newWord) => {
        try {
            const response = await fetch(`${baseUrl}/api/words/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWord),
            });
            if (!response.ok) {
                throw new Error('Failed to add word');
            }
            const data = await response.json();
            runInAction(() => {
                this.words.push(data);
                this.addError = null;
            });
        } catch (error) {
            console.error('Error adding word:', error);
            runInAction(() => {
                this.addError = 'Ошибка при добавлении слова: ' + error.message;
            });
            throw error;
        }
    }

    updateWord = async (id, updatedWord) => {
        try {
            const response = await fetch(`${baseUrl}/api/words/${updatedWord.id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWord),
            });
            if (!response.ok) {
                throw new Error('Failed to update word');
            }
            const data = await response.json();
            runInAction(() => {
                const index = this.words.findIndex(word => word.id === id);
                if (index !== -1) {
                    this.words[index] = data;
                }
                this.updateError = null;
            });
        } catch (error) {
            console.error('Error updating word:', error);
            runInAction(() => {
                this.updateError = 'Ошибка при редактировании слова: ' + error.message;
            });
        }
    }

    deleteWord = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/words/${id}/delete`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to delete word');
            }
            runInAction(() => {
                this.words = this.words.filter(word => word.id !== id);
                this.deleteError = null;
            });
        } catch (error) {
            console.error('Error deleting word:', error);
            runInAction(() => {
                this.deleteError = 'Ошибка при удалении слова: ' + error.message;
            });
        }
    }
}

const wordsStore = new WordsStore();
export default wordsStore;
