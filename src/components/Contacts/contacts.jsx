import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from './contacts.module.css';

function Contacts() {
    return (
        <div className={styles.icons}>
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
        </div>
    );
}

export default Contacts;