import React from "react";
import styles from './forgot-password.module.css';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useForm } from "../../hooks/useForm";

function ForgotPassword({forgotPassword}) {

    const {values, handleChange, setValues} = useForm({email: ''});

    const handleForgotPassword = (e) => {
        e.preventDefault();
        forgotPassword(values.email);
    }

    return(
        <div className={styles.content}>
            <form onSubmit={handleForgotPassword}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                    value = {values.email}
                    onChange = {handleChange}
                    placeholder = {'Укажите e-mail'}
                        isIcon={false}
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='submit'>
                    Восстановить
                </Button>
            </div>
            </form>
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