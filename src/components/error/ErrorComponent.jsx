import React from 'react';
import styles from './error.module.css'

const ErrorComponent = ({ message }) => {
    return (
        <div className={styles.ErrorMessage}>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    );
};

export default ErrorComponent;
