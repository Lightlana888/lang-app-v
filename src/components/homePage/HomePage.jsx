import React, { useState } from 'react';
//import AuthApp from './input';
//import RegistrationForm from './input';
import WordTable from '../wordTable/WordTable';
import Button from '../buttons/Button';
import WordList from '../wordList/WordList';
import styles from './homePage.module.css';
import buttonStyles from '../buttons/Button.module.css';

function HomePage() {
    const [showWordTable, setShowWordTable] = useState(false);
    const [showWordList, setShowWordList] = useState(false);

    const handlePlayButtonClick = () => {
        setShowWordTable(false);
        setShowWordList(true);
    };

    const handleWordListButtonClick = () => {
        setShowWordTable(true);
        setShowWordList(false);
    };


    //const [isRegistered, setIsRegistered] = useState(true);

    /*const handleRegistration = () => {
        setIsRegistered(true);

    };*/

    return (
        /*<div>
    
    {isRegistered ? <WordTable /> : <AuthApp onRegistration={handleRegistration} />}
            </div>
        );
    }*/

        <div className={styles.homePage}>
            {showWordList && <WordList />}
            {showWordTable && <WordTable />}
            {!showWordList && !showWordTable && (
                <>
                    <Button className={buttonStyles.buttonPlay} onClick={handlePlayButtonClick} buttonText="Играть"></Button>
                    <Button className={buttonStyles.buttonList} onClick={handleWordListButtonClick} buttonText="Список слов"></Button>
                </>
            )}
        </div>
    );
}
export default HomePage;
