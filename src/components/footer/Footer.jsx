import React from 'react';
import styles from './footer.module.css';
import logo from '../../assets/logo.png';
import Contacts from '../Contacts/contacts';
import { Link } from 'react-router-dom';

function Footer() {

    const handleClick = () => {

    };

    return (
        <footer className={styles.footer}>
            <Link to="/home" onClick={handleClick} className={styles.logoLink}>
                <img src={logo} alt="Логотип" className={styles.logo} />
            </Link>
            <div>Подписывайся! Будем рады каждому!</div>
            <Contacts />
        </footer>
    );
}

export default Footer;

