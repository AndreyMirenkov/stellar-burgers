import React from 'react'
import {useState} from 'react'
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
// import { data } from '../../utils/data';
import PropTypes from 'prop-types';
import Ingredients from '../ingredients/ingredients';



function BurgerIngredients({data}){
    const [current, setCurrent] = useState('one');


    return(
        <section className = {styles.content}>
            <h2 style = {{textAlign: 'start'}} className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <a style = {{textDecoration: 'none'}} href='#bun'>
                <Tab value="one" href = '#1' active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                </a>
                <a style = {{textDecoration: 'none'}} href = '#sauce'>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                </a>
                <a style = {{textDecoration: 'none'}} href = '#main'>
                <Tab value="three" href = '#3' active={current === 'three'} onClick={setCurrent}>
                    Начинка
                </Tab>
                </a>
            </div>
            <h3 id = 'bun' style ={{textAlign: 'start'}} className='mt-10 mb-6 text text_type_main-medium'>Булки</h3>
            <div className={styles.ingredientslist}>
                {data.map((el) =>( el.type === 'bun' &&
                    <Ingredients key = {el._id} element = {el}/>
                ))
                }
            </div>
            <h3 id = 'sauce' style ={{textAlign: 'start'}} className='mt-10 mb-6 text text_type_main-medium'>Соусы</h3>
            <div className={styles.ingredientslist}>
                {data.map((el) =>( el.type === 'sauce' &&
                    <Ingredients key = {el._id} element = {el}/>
                ))
            }
            </div>
            <h3 id = 'main' style ={{textAlign: 'start'}} className='mt-10 mb-6 text text_type_main-medium'>Начинка</h3>
            <div className={styles.ingredientslist}>
                {data.map((el) =>( el.type === 'main' &&
                    <Ingredients key = {el._id} element = {el}/>
                ))
                }
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf( 
        PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']),
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
    }),
)}

export default BurgerIngredients;

