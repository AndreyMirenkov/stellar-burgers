import React from "react";
import styles from './order-details.module.css';
import Modal from "../modal/modal";
import orderImg from '../../images/icon-order.svg'
import PropTypes from 'prop-types';

function OrderDetails({isOpen, onClose}) {

    const modal = (
      <Modal onClose = {onClose} heading = {false}> 
        <h2 className={`mt-30 mb-8 text text_type_digits-large ${styles.text} ${styles.number}`}>034536</h2>
        <h3 className={`mb-15 text text_type_main-medium ${styles.text}`}>идентификатор заказа</h3>
        <img className={styles.img} src = {orderImg} alt = 'Картинка'/>
        <p className={`mt-15 mb-2 text text_type_main-default ${styles.text}`}>Ваш заказ начали готовить</p>
        <p className={`mb-30 text text_type_main-default text_color_inactive ${styles.text}`}>Дождитесь готовности на орбитальной станции</p>
      </Modal>
    );

    return (
      <div style={{overflow: 'hidden'}}>
        {isOpen && modal}
      </div>
    );
}

OrderDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}


export default OrderDetails;