import React from "react";
import styles from './login.module.css';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useForm } from "../../hooks/useForm";

function Login({handleLogin}) {

    const {values, handleChange, setValues} = useForm({email: '', password: ''});


    const handleClick = (e) => {
        e.preventDefault();
        handleLogin(values.email, values.password);
    }


    return(
        <div className={styles.content}>
            <form onSubmit={handleClick}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Вход</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                        value = {values.email}
                        onChange = {handleChange}
                        isIcon={false}
                    />
                </li>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {values.password}
                        onChange = {handleChange}
                        extraClass="mb-2"
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='submit'>
                    Войти
                </Button>
            </div>
            </form>
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