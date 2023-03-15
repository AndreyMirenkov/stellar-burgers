import React, {FC} from "react";
import { useState, useEffect } from "react";
import styles from './app-header.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from "react-router-dom";

const AppHeader: FC = () => {
    const location = useLocation();
    const [typeMain, setTypeMain] = useState<boolean>(false);
    const [typeList, setTypeList] = useState<boolean>(false);
    const [typeProfile, setTypeProfile] = useState<boolean>(false);
    const [textMain, setTextMain] = useState<boolean>(false);
    const [textList, setTextList] = useState<boolean>(false);
    const [textProfile, setTextProfile] = useState<boolean>(false);

    const markMain = typeMain ? 'primary' : 'secondary' ;
    const markList = typeList ? 'primary' : 'secondary' ;
    const markProfile = typeProfile ? 'primary' : 'secondary'; 
    const textActiveMain = textMain ? '' : 'text_color_inactive';
    const textActiveList = textList ? '' : 'text_color_inactive';
    const textActiveProfile = textProfile ? '' : 'text_color_inactive';


   useEffect(() => {
    if (location.pathname === '/'){
        setTypeMain(true);
        setTypeList(false);
        setTypeProfile(false)
        setTextMain(true);
        setTextList(false);
        setTextProfile(false);
    }
    if (location.pathname === '/list'){
        console.log(location)
        setTypeMain(false);
        setTypeList(true);
        setTypeProfile(false);
        setTextMain(false);
        setTextList(true);
        setTextProfile(false);
    }
    if (location.pathname === '/profile'){
        setTypeProfile(true);
        setTypeMain(false);
        setTypeList(false);
        setTextMain(false);
        setTextList(false);
        setTextProfile(true);
    }
   },[location])
    
   
   

    return (
        <header className={styles.header}>
                <nav className={styles.list}>
                    <Link to = '/' className={`mr-2 pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                        <BurgerIcon type={markMain}/>
                        <p className = {`pl-2 text text_type_main-default ${textActiveMain} ${styles.text}`}>Конструктор</p>
                    </Link>
                    <Link to = '/' className={`pl-5 pr-5 pb-4 pt-4 ${textActiveList} ${styles.item}`}>
                        <ListIcon type={markList} />
                        <p className={`pl-2 text text_type_main-default text_color_inactive ${styles.text}`}>Лента заказов</p>
                    </Link>
                </nav>
                <Link to = '/' className={styles.logo}>
                    <Logo/>
                </Link>
                <Link to = '/profile' className={`pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                    <ProfileIcon type={markProfile} />
                    <p className={`pl-2 text text_type_main-default ${textActiveProfile} ${styles.text}`}>Личный кабинет</p>
                </Link>
        </header>
    )
}

export default AppHeader;
