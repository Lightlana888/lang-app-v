import React from 'react';
import styles from './header.module.css';
import Menu from '../menu/menu';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {

    const handleClick = () => { };

    return (
        <header className={styles.header}>
            <Link to="/" onClick={handleClick} className={styles.logoLink}>
                <img src={logo} alt="Логотип" className={styles.logo} />
            </Link>
            <div>Раскрой свой потенциал слово за словом!</div>
            <Menu />
        </header>
    );
}

export default Header;