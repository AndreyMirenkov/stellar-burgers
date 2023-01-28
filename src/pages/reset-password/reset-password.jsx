import React from "react";
import styles from './reset-password.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useForm } from "../../hooks/useForm";

function ResetPassword({resetPassword}) {

    const {values, handleChange, setValues} = useForm({password: '', token: ''});

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(values.password, values.token);
    }

    return(
        <div className={styles.content}>
            <form onSubmit={handleResetPassword}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {values.password}
                        onChange = {handleChange}
                        placeholder = {'Введите новый пароль'}
                        extraClass="mb-2"
                    />
                </li>
                <li className='mb-6'>
                    <Input  type={'text'}
                        placeholder={'Введите код из письма'}
                        value = {values.token}
                        onChange = {handleChange}
                        name={'name'}
                        error={false}
                        size={'default'}
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='submit'>
                    Сохранить
                </Button>
            </div>
            </form>
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