import React from "react";
import { FC } from "react";
import styles from './order-details.module.css';
import orderImg from '../../images/icon-order.svg';

type TInfoOrder = {
  number: string | null;
  name: string| null;
}

const OrderDetails:FC<TInfoOrder> = ({number, name}) => {


    return (
      <div className={styles.content}>
        <h2 className={`mt-30 mb-8 text text_type_digits-large ${styles.text} ${styles.number}`}>{number}</h2>
        <h3 className={`mb-15 text text_type_main-medium ${styles.text}`}>{name}</h3>
        <img className={styles.img} src = {orderImg} alt = 'Картинка'/>
        <p className={`mt-15 mb-2 text text_type_main-default ${styles.text}`}>Ваш заказ начали готовить</p>
        <p className={`mb-30 text text_type_main-default text_color_inactive ${styles.text}`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    );
}

export default OrderDetails;