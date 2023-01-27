import React from "react";
import { useState } from "react";
import styles from './forgot-password.module.css';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ForgotPassword({forgotPassword}) {

    const [email, setEmail] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        forgotPassword(email);
    }

    return(
        <div className={styles.content}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    placeholder = {'Укажите e-mail'}
                        isIcon={false}
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='button' onClick={handleForgotPassword}>
                    Восстановить
                </Button>
            </div>
            <p className={`mb-4 text text_type_main-small text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <Link to = '/login' className={styles.link}>Войти</Link>
            </p>
        </div>
    )
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired
}

export default ForgotPassword;