import React from "react";
import styles from './app-header.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
function AppHeader(){

    return (
        <header className={styles.header}>
                <nav className={styles.list}>
                    <li className={`mr-2 pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                        <BurgerIcon type="primary"/>
                        <p className = 'pl-2 text text_type_main-default'>Конструктор</p>
                    </li>
                    <li className={`pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                        <ListIcon type="secondary" />
                        <p className='pl-2 text text_type_main-default'>Лента заказов</p>
                    </li>
                </nav>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <div className={`pl-5 pr-5 pb-4 pt-4 ${styles.item}`}>
                    <ProfileIcon type="secondary" />
                    <p className='pl-2 text text_type_main-default'>Личный кабинет</p>
                </div>
        </header>
    )
}

export default AppHeader;
