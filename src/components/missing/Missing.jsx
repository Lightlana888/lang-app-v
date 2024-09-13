import React from 'react';
import styles from './missing.module.css';


function Missing() {



    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.Error}>404</h1>
            <div className={styles.errorText}>Oops Something went wrong!<br />The page is not found, I'm sorry</div>
        </div>
    );
}

export default Missing;