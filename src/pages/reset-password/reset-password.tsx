import React, {useState, FC, SyntheticEvent} from "react";
import styles from './reset-password.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

type TResetPassword = {
    resetPassword: (password: string, token: string) => void
}

type TValues = {
    password: string;
    token: string;
  }

const ResetPassword: FC<TResetPassword> = ({resetPassword}) => {

    const [values, setValues] = useState<TValues>({password: '', token: ''});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
      };

    const handleResetPassword = (e: SyntheticEvent) => {
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