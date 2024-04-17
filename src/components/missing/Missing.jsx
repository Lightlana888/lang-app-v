import React from 'react';
import styles from './missing.module.css';


function Missing() {



    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.Error}>404</h1>
            <div className={styles.errorText}>Ой что-то пошло не так!<br /> Страница не найдена, мне жаль...</div>
        </div>
    );
}

export default Missing;