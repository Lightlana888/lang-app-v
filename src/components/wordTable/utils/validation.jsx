
export const isLatin = (value) => /^[a-zA-Z\s[\],.:'"]*$/.test(value);

export const isCyrillic = (value) => /^[а-яА-ЯёЁ\s,.:'"]*$/.test(value);

export const validateInput = (value, fieldType) => {
    if (fieldType === 'english') {
        return isLatin(value);
    } else if (fieldType === 'russian') {
        return isCyrillic(value);
    } else {
        return true;
    }
};