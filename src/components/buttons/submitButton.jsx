
import React from 'react';
import styles from '../../assets/submitButton.module.css';

function SubmitButton() {
    return (
        <button type="submit" className={styles.button}>
            Зарегистрироваться
        </button>
    );
}

export default SubmitButton;