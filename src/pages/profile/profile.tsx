import React, {FC, SyntheticEvent} from "react";
import styles from './profile.module.css';
import {useState, useEffect} from 'react';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "react-router-dom";
import { useSelector } from "../../utils/hooks/hooks";
import PropTypes from 'prop-types';

type TProfile = {
    updateProfile: (inputName: string, inputEmail: string) => void;
    logoutProfile: () => void;
}

const Profile:FC<TProfile> = ({updateProfile, logoutProfile}) => {

    const name = useSelector((store) => store.authReducer.name);
    const email = useSelector((store) => store.authReducer.email)
    const [inputName, setInputName] = useState(name);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputPassword, setInputPassword] = useState('');
    const [disabledInputName, setDisabledInputName] = useState<boolean>(true);

    useEffect(() => {
        setInputName(name);
        setInputEmail(email);
    },[name, email])

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        setDisabledInputName(true);
        updateProfile(inputName, inputEmail);
        setInputName(name)
        setInputEmail(email)
    }

    const handleReturn = (e: SyntheticEvent) => {
        e.preventDefault();
        setDisabledInputName(true);
        setInputName(name);
        setInputEmail(email);
    }

    const handleExit = () => {
        logoutProfile();
        setInputName('');
        setInputEmail('');
    }

    return(
        <div className={styles.content}>
            <div>
                <nav className={`mb-20 mr-15 ${styles.navigation}`}>
                    <NavLink exact to = '/profile' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link}>Профиль</NavLink>
                    <NavLink to = '/profile/orders' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link}>История заказов</NavLink>
                    <NavLink to = '/login' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link} onClick = {handleExit}>Выход</NavLink>
                </nav>
                <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>

            <form className={styles.main_field} onSubmit = {handleClick}>
                <ul className={styles.list}>
                    <li className='mb-6'>
                        <Input  type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            value = {inputName}
                            onChange = {e => setInputName(e.target.value)}
                            icon={'EditIcon'}
                            error={false}
                            disabled = {disabledInputName}
                            onIconClick={() => {setDisabledInputName(false)}}
                            size={'default'}
                        />
                    </li>
                    <li className='mb-6'>
                        <EmailInput name={'Логин'}
                            value = {inputEmail}
                            onChange = {e => setInputEmail(e.target.value)}
                            isIcon={true}
                        />
                    </li>
                    <li className='mb-6'>
                        <PasswordInput name={'password'}
                            value = {inputPassword}
                            onChange = {e => setInputPassword(e.target.value)}
                            extraClass="mb-2"
                            icon="EditIcon"
                        />
                    </li>
                </ul>
                <div className={styles.buttons}>
                <Button htmlType="button" type="secondary" size="medium" onClick = {handleReturn}>
                    Отмена
                </Button>
                <Button type="primary" size="medium" htmlType='submit'>
                    Сохранить
                </Button>
                </div>
            </form>
            
        </div>
    )
}
Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    logoutProfile: PropTypes.func.isRequired,
}

export default Profile;