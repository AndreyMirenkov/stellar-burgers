import React from "react";
import styles from './register.module.css';
import {useState} from 'react';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Register({handleRegister}) {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleClick = (e) => {
    e.preventDefault()
    handleRegister(name, email, password)
}

    return(
        <div className={styles.content}>
            <h2 className={`mb-6 text text_type_main-medium ${styles.title}`}>Регистрация</h2>
            <ul className={styles.list}>
                <li className='mb-6'>
                    <Input  type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        value = {name}
                        onChange={e => setName(e.target.value)}
                        error={false}
                        size={'default'}
                    />
                </li>
                <li className='mb-6'>
                    <EmailInput name={'email'}
                        value = {email}
                        onChange={e => setEmail(e.target.value)}
                        isIcon={false}
                    />
                </li>
                <li className='mb-6'>
                    <PasswordInput name={'password'}
                        value = {password}
                        onChange={e => setPassword(e.target.value)}
                        extraClass="mb-2"
                    />
                </li>
            </ul>
            <div className={`mb-20 ${styles.button}`}>
                <Button type="primary" size="large" htmlType='button' onClick = {handleClick}>
                    Зарегистрироваться
                </Button>
            </div>
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