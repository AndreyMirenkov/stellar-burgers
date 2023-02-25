import React from "react";
import styles from './register.module.css';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import PropTypes from 'prop-types';

function Register({handleRegister}) {

const {values, handleChange, setValues} = useForm({name: '', email: '', password: ''});


const handleClick = (e) => {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password)
}

    return(
        <div className={styles.content}>
            <form onSubmit={handleClick}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Регистрация</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <Input  type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        value = {values.name}
                        onChange={handleChange}
                        error={false}
                        size={'default'}
                        required
                    />
                </li>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                        value = {values.email}
                        onChange={handleChange}
                        isIcon={false}
                    />
                </li>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {values.password}
                        onChange={handleChange}
                        extraClass="mb-2"
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='submit'>
                    Зарегистрироваться
                </Button>
            </div>
            </form>
            <p className={`text text_type_main-small text_color_inactive ${styles.text}`}>
                Уже зарегистрированы? <Link to = '/login' className={styles.link}>Войти</Link>
            </p>
        </div>
    )
}

Register.propTypes = {
    handleRegister: PropTypes.func.isRequired
}

export default Register;