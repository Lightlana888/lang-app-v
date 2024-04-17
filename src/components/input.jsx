import React, { useState, useEffect } from 'react';
import styles from '../assets/input.module.css'

function RegistrationForm() {
    useEffect(() => {
        console.log('До извлечения данных из хранилища');
        const storedData = localStorage.getItem('userData');
        if (storedData !== null) {
            const userData = JSON.parse(storedData);
            console.log('После извлечения данных из хранилища');
            console.log(userData);
        } else {
            console.log('Данные не найдены в локальном хранилище');
        }
    }, []);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            console.log('Пароли не совпадают');
            return;
        }

        localStorage.setItem('userData', JSON.stringify(formData));
        console.log('Регистрация успешна:', formData);

        setFormData({
            username: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Логин:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Введите логин"
                value={formData.username}
                onChange={handleChange}
                required
            /><br /><br />

            <label htmlFor="password">Пароль:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
                required
            /><br /><br />

            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            /><br /><br />

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

function LoginForm() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        //Данные из Local Storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && loginData.username === userData.username && loginData.password === userData.password) {
            console.log('Вход выполнен успешно:', loginData);

        } else {
            console.log('Неверный логин или пароль');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Логин:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Введите логин"
                value={loginData.username}
                onChange={handleChange}
                required
            /><br /><br />

            <label htmlFor="password">Пароль:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={loginData.password}
                onChange={handleChange}
                required
            /><br /><br />

            <button type="submit">Войти</button>
        </form>
    );
}


function AuthApp() {
    return (
        <div className={styles.authContainer}>
            <h2>Регистрация</h2>
            <RegistrationForm />
            <hr />
            <h2>Вход</h2>
            <LoginForm />
        </div>
    );
}

export default AuthApp;