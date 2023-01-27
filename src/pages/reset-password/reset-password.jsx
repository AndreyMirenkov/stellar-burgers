import React from "react";
import { useState } from 'react';
import styles from './reset-password.module.css';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ResetPassword({resetPassword}) {

    const [password, setPassword] = useState('');
    const [token, setToken] = useState('')

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(password, token);
    }

    return(
        <div className={styles.content}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        placeholder = {'Введите новый пароль'}
                        extraClass="mb-2"
                    />
                </li>
                <li className='mb-6'>
                    <Input  type={'text'}
                        placeholder={'Введите код из письма'}
                        value = {token}
                        onChange = {e => setToken(e.target.value)}
                        name={'name'}
                        error={false}
                        size={'default'}
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='button' onClick={handleResetPassword}>
                    Сохранить
                </Button>
            </div>
            <p className={`text text_type_main-small text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <Link to = '/register' className={styles.link}>Войти</Link>
            </p>
        </div>
    )
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
}

export default ResetPassword;