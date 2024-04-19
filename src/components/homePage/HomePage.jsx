import React, { useState } from 'react';
//import AuthApp from './input';
//import RegistrationForm from './input';
import WordTable from '../wordTable/WordTable';
import Button from '../buttons/Button';
import WordList from '../wordList/WordList';
import styles from './homePage.module.css';
import buttonStyles from '../buttons/Button.module.css';
import { Link } from 'react-router-dom';
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
                    <Link to="/game" className={buttonStyles.buttonPlay} onClick={handlePlayButtonClick}>Играть</Link>
                    <Link to="/list" className={buttonStyles.buttonList} onClick={handleWordListButtonClick}>Список слов</Link>
                </>
            )}

        </div>
    );
}
export default HomePage;
