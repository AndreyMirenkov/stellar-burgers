import React from 'react'
import {useState, useMemo} from 'react'
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import Ingredients from '../ingredients/ingredients';
import {dataPropTypes} from '../../utils/prop-types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


function BurgerIngredients({data, elPopup, isOpen, onClose, onClick}){
    const [current, setCurrent] = useState('one');

    const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
    const mains = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
    const sauces = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);


    return(
        <section className = {styles.content}>
            <h2 className={`mt-10 mb-5 text text_type_main-large ${styles.text_header}`}>Соберите бургер</h2>
            <div className={`mb-10 ${styles.nav}`}>
                <a className={styles.nav__text} href='#bun'>
                    <Tab value="one" href = '#1' active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a className={styles.nav__text} href = '#sauce'>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a className={styles.nav__text} href = '#main'>
                    <Tab value="three" href = '#3' active={current === 'three'} onClick={setCurrent}>
                        Начинка
                    </Tab>  
                </a>
            </div>
            <div className={styles.all_ingredients}>
                <h3 id = 'bun' className={`mb-6 text text_type_main-medium ${styles.ingredients__chapter}`}>Булки</h3>
                <div className={styles.ingredients_list}>
                    {buns.map((el) => (
                        <Ingredients key = {el._id} element = {el} onClick = {onClick}/>
                    ))
                    }
                </div>
                <h3 id = 'sauce' className={`mt-10 mb-6 text text_type_main-medium ${styles.ingredients__chapter}`}>Соусы</h3>
                <div className={styles.ingredients_list}>
                    {sauces.map((el) => (
                        <Ingredients key = {el._id} element = {el} onClick = {onClick}/>
                    ))
                }
                </div>
                <h3 id = 'main' className={`mt-10 mb-6 text text_type_main-medium ${styles.ingredients__chapter}`}>Начинка</h3>
                <div className={styles.ingredients_list}>
                    {mains.map((el) => (
                        <Ingredients key = {el._id} element = {el} onClick = {onClick}/>
                    ))
                    }
                </div>
            </div>

            {isOpen && (
            <Modal onClose={onClose} heading = {true}>
                <IngredientDetails data = {elPopup}/>
            </Modal>
            )}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    elPopup: dataPropTypes.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default BurgerIngredients;

