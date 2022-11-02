import React from 'react';
import styles from './ingredients.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

function Ingredients({element}){

    return(
        <div className = {styles.element}>
            <img className = 'mb-1 ml-4 mr-4' src = {element.image} alt = 'картинка ингредиента'/>
            <div className={styles.price}>
                <p className = ' mb-1 mr-2 text text_type_digits-default'>{element.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className = {`text text_type_main-default ${styles.text}`}>{element.name}</p>
            {element.type === 'bun' && <Counter count={1} size="default" />}
        </div>
    )
}

export default Ingredients;