import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './menu.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader} onClick={toggleMenu}>
                <GiHamburgerMenu style={{ marginTop: '10px' }} />
                <span className={styles.menuHeaderText} onClick={toggleMenu}>Меню</span>
            </div>
            <motion.div
                className={`${styles.menu} ${isOpen ? styles.open : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <Link to="/home" onClick={closeMenu}>Главная</Link>
                <Link to="/list" onClick={closeMenu}>Список слов</Link>
                <Link to="/game" onClick={closeMenu}>Играть</Link>
            </motion.div>
        </div>
    );
}

export default Menu;