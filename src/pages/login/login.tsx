import React, {FC, SyntheticEvent, useState} from "react";
import styles from './login.module.css';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// import { useForm } from "../../utils/hooks/useForm";

type TLogin = {
    handleLogin: (email: string, password: string) => void
}

type TValues = {
    email: string;
    password: string;
  }

const Login: FC<TLogin> = ({handleLogin}) => {

    const [values, setValues] = useState<TValues>({email: '', password: ''});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
      };

    const handleClick = (e: SyntheticEvent) => {
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