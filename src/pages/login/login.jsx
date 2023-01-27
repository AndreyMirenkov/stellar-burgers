import React from "react";
import styles from './login.module.css';
import {useState} from 'react';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Login({handleLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleClick = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    }


    return(
        <div className={styles.content}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Вход</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        isIcon={false}
                    />
                </li>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        extraClass="mb-2"
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='button' onClick={handleClick}>
                    Войти
                </Button>
            </div>
            <p className={`mb-4 text text_type_main-small text_color_inactive ${styles.text}`}>
                Вы — новый пользователь? <Link to = '/register' className={styles.link}>Зарегистрироваться</Link>
            </p>
            <p className={`text text_type_main-small text_color_inactive ${styles.text}`}>
                Забыли пароль? <Link to = '/forgot-password' className={styles.link}>Восстановить пароль</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default Login;