import React from "react";
import styles from './app-header.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
function AppHeader(){

    return (
        <header className={styles.header}>
                <nav className={styles.list}>
                    <a href = '#1' className={`mr-2 pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                        <BurgerIcon type="primary"/>
                        <p className = {`pl-2 text text_type_main-default ${styles.text}`}>Конструктор</p>
                    </a>
                    <a href = '#1' className={`pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                        <ListIcon type="secondary" />
                        <p className={`pl-2 text text_type_main-default ${styles.text}`}>Лента заказов</p>
                    </a>
                </nav>
                <a href = '#1' className={styles.logo}>
                    <Logo/>
                </a>
                <a href = '#1' className={`pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                    <ProfileIcon type="secondary" />
                    <p className={`pl-2 text text_type_main-default ${styles.text}`}>Личный кабинет</p>
                </a>
        </header>
    )
}

export default AppHeader;
