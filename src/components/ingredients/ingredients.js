import React, {useState, useEffect} from 'react';
import styles from './ingredients.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/prop-types';
import {useDrag} from 'react-dnd';
import {useSelector} from 'react-redux';

function Ingredients({element, onClick, type}){
    const [quantity, setQuantity] = useState(0);
    const ingredientsInBurger = useSelector(store => store.ingredientsInConstructor);
    const id = element._id

    const [{opacity}, ref] = useDrag({
        type: type,
        item: { id },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      });

useEffect(() => {
    if(type === 'main'){
        setQuantity(() => ingredientsInBurger.ingredients.filter((item) => item._id === id).length);
    } else {
        if (ingredientsInBurger.buns.filter((item) => item._id === id).length === 0){
            setQuantity(0);
        } else {
            setQuantity(2);
        }
}
}, [id, ingredientsInBurger, type])

    return(
        <div className = {styles.element} style = {{opacity: opacity}}>
            <div ref={ref}>
            <img className = 'mb-1 ml-4 mr-4' src = {element.image} alt = 'картинка ингредиента' onClick={() => onClick(element)}/>
            </div>
            <div className={styles.price}>
                <p className = ' mb-1 mr-2 text text_type_digits-default'>{element.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className = {`text text_type_main-default ${styles.text}`}>{element.name}</p>
            <Counter count={quantity} size="default" extraClass="m-1" />
        </div>
    )
}

Ingredients.propTypes = {
    element: dataPropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

export default Ingredients;