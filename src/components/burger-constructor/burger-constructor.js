import React from 'react';
import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsCategory from '../ingredients-category/ingredients-category';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/prop-types'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor({data, isOpen, onClose, onClick}){

const priceArray = useMemo(() => data.map(item => item.price), [data]);
const sum = useMemo(() => priceArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0), [priceArray]);


    return(
        <section className={`mt-25 ${styles.content}`}>
            <div className={styles.ingredients_constructor}>
                <div className='ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />
                </div>
                <ul className= {styles.fill}>
                {data.map((el) => (
                    <IngredientsCategory key={el._id} text = {el.name} price = {el.price} thumbnail = {el.image}/>
                ))
                }
                </ul>
                <div className='ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />
                </div>
            </div>
            <div className={`mt-10 mr-4 ${styles.info_order}`}>
                <div className={`mr-10 ${styles.price}`}>
                <p className='mr-2 text text_type_digits-medium'>{sum}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" htmlType='button' onClick={onClick}>
                Оформить заказ
            </Button>
            </div>

            {isOpen && (
            <Modal onClose={onClose} heading = {false}>
                <OrderDetails/>
            </Modal>
            )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default BurgerConstructor