import React, { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsCategory from '../ingredients-category/ingredients-category';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/prop-types'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {useSelector, useDispatch} from 'react-redux'
import {useDrop} from 'react-dnd'
import update from 'immutability-helper';
import {GET_CONSTRUCTOR_BUNS_INGREDIENTS, GET_CONSTRUCTOR_MAIN_INGREDIENTS, UPDATE_MAIN_INGREDIENTS} from '../../services/action';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function BurgerConstructor({isOpen, onClose, onClick}){
    
const dispatch = useDispatch();
const [ingredients, setIngredients] = useState([]);
const infoOrder = useSelector(store => store.order);
const mainIngredients = useSelector(store => store.ingredientsInConstructor.ingredients);
const bunsIngredients = useSelector(store => store.ingredientsInConstructor.buns);
const priceArrayMain = useMemo(() => mainIngredients.map(item => item.price), [mainIngredients]);
const priceBuns = useMemo(() => bunsIngredients.map(item => item.price), [bunsIngredients])
const sumBuns = useMemo(() => priceBuns * 2)
const sumMain = useMemo(() => priceArrayMain.reduce((previousValue, currentValue) => previousValue + currentValue, 0), [priceArrayMain]);
const sum = useMemo(() => sumMain + sumBuns, [sumMain, sumBuns]);

const [{ isHover }, dropTarget] = useDrop({
    accept: 'main',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item){
        dispatch({type: GET_CONSTRUCTOR_MAIN_INGREDIENTS, item })
  }
  });
  const [{ isHoverBunTop }, dropBunTop] = useDrop({
    accept: 'buns',
    collect: monitor => ({
      isHoverBunTop: monitor.isOver()
    }),
    drop(item){
        dispatch({type: GET_CONSTRUCTOR_BUNS_INGREDIENTS, item })
  }
  });

  const [{ isHoverBunBottom }, dropBunBottom] = useDrop({
    accept: 'buns',
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver()
    }),
    drop(item){
        dispatch({type: GET_CONSTRUCTOR_BUNS_INGREDIENTS, item })
  }
  });


useEffect(() => {
    setIngredients(mainIngredients);
},[mainIngredients])

useEffect(() => {
    dispatch({type: UPDATE_MAIN_INGREDIENTS, data: ingredients })
}, [ingredients]);

const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    setIngredients((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }))
  }, [])

  const borderMain = isHover ? '3px dashed indigo' : 'transparent';
  const borderBuns = isHoverBunTop || isHoverBunBottom ? '3px dashed indigo' : 'transparent';

    return(
        <section className={`mt-25 ${styles.content}`}>
            <div className={styles.ingredients_constructor}>
                <div ref ={dropBunTop} className='ml-4 mr-4 pl-8' style =  {{border: borderBuns, borderRadius: '88px 88px 40px 40px'}}>
                {bunsIngredients[0] ?
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text = {bunsIngredients[0].name + ' (верх)'}
                        price = {bunsIngredients[0].price}
                        thumbnail = {bunsIngredients[0].image}
                /> : 
                    <div className = {`text text_type_main-default ${styles.drop_container_top}`}>Выберите булку</div>}
                </div>
                <DndProvider backend={HTML5Backend}>
                <ul ref = {dropTarget} className= {styles.fill} style = {{border: borderMain, borderRadius: 40}}>
                {mainIngredients[0] ? 
                    mainIngredients.map((el, index) => (
                    <IngredientsCategory key={index} id = {el._id} text = {el.name} price = {el.price} thumbnail = {el.image} index = {index} moveIngredient = {moveIngredient}/>
                ))
                :
                    <li className = {`text text_type_main-default ${styles.drop_container_main}`}>Выберите соус и начинку</li>}
                </ul>
                </DndProvider>
                <div ref ={dropBunBottom} className='ml-4 mr-4 pl-8' style =  {{border: borderBuns, borderRadius: '40px 40px 88px 88px'}}>
                {bunsIngredients[0] ?
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text= {bunsIngredients[0].name + ' (низ)'}
                        price= {bunsIngredients[0].price}
                        thumbnail= {bunsIngredients[0].image}
                /> :
                    <div className = {`text text_type_main-default ${styles.drop_container_bottom}`}>Выберите булку</div>}
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
                <OrderDetails infoOrder={infoOrder}/>
            </Modal>
            )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default BurgerConstructor