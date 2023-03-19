import React, {FC} from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-popup.module.css';
import { TDataWatchOrder } from '../../utils/typescriptTypes/watchOrder';

type TOrderPopup = {
    data: TDataWatchOrder
}

const OrderPopup:FC<TOrderPopup> = ({data}) => {

    return(
        <div className={styles.content}>
            <h3 className={`mb-3 text text_type_main-medium ${styles.name}`}>{data.name}</h3>
            <p className={`mb-15 text text_type_main-default ${styles.status}`} style ={{color: data.styleStatus}}>{data.statusText}</p>
           <p className={`mb-6 text text_type_main-medium ${styles.structure}`}>Состав:</p>
           <ul className={styles.list_ingredient}>{
            data.array.length !== 0 
            ? 
            data.array.map((el, index) => (
                <li className={styles.element} key = {index}>
                    <img className={styles.image} src = {el.image} alt = 'Картинка'/>
                    <h3 className={`text text_type_main-default ${styles.name_ingredient}`}>{el.name}</h3>
                    <div className={styles.price_ingredient}>
                        <p className={`mr-2 text text_type_digits-default`}>{el.type === 'bun' ? '2 x ' + el.price : '1 x '+el.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </li>
            ))  
           :
                <li className={`text text_type_main-default ${styles.element}`}>
                    <p>Ошибка Загрузки данных</p>
                </li>
           }</ul>
           <div className={styles.add_info}>
                <p className={`text text_type_main-default text_color_inactive ${styles.date}`}>{data.infoDate}</p>
                <div className={styles.price}>
                        <p className={`mr-2 text text_type_digits-default`}>{data.price}</p>
                        <CurrencyIcon type="primary"/>
                </div>
           </div>
        </div>
    )
}

export default OrderPopup;