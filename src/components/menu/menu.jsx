import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './menu.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader} onClick={toggleMenu}>
                <GiHamburgerMenu style={{ marginTop: '10px' }} />
                <span className={styles.menuHeaderText} onClick={toggleMenu}>Menu</span>
            </div>
            <motion.div
                className={`${styles.menu} ${isOpen ? styles.open : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <Link to="/" onClick={closeMenu}>Home Page</Link>
                <Link to="/list" onClick={closeMenu}>Words List</Link>
                <Link to="/game" onClick={closeMenu}>Play</Link>
            </motion.div>
        </div>
    );
}


export default Menu;