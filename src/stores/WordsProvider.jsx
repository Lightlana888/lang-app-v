import React from 'react';
import { Provider } from 'mobx-react';
import wordsStore from './wordsStore';

const WordsProvider = ({ children }) => {
    return (
        <Provider wordsStore={wordsStore}>
            {children}
        </Provider>
    );
};

export default WordsProvider;
