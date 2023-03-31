import React, {useState, useEffect, FC} from 'react';
import styles from './ingredients.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag} from 'react-dnd';
import {useSelector} from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {TIngredient} from '../../utils/typescriptTypes/ingredient';

type TElement = {
    element: TIngredient
    onClick: (element: TIngredient) => void;
    type: 'buns' | 'sauce' | 'main';
}

type TItemIngredient = {
    details: TIngredient;
    key: string;
}

const Ingredients: FC<TElement> = ({element, onClick, type}) => {
    const [quantity, setQuantity] = useState(0);
    const ingredientsInBurger = useSelector((store: any) => store.rootReducer.ingredientsInConstructor);
    const id = element._id
    let location = useLocation();

    const [{opacity}, ref] = useDrag({
        type: type,
        item: { id },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      });

useEffect(() => {
    if(type === 'main'){
        setQuantity(() => ingredientsInBurger.ingredients.filter((item: TItemIngredient) => item.details._id === id).length);
    } else {
        if (ingredientsInBurger.buns.filter((item: TIngredient) => item._id === id).length === 0){
            setQuantity(0);
        } else {
            setQuantity(2);
        }
}
}, [id, ingredientsInBurger, type])

    return(
        <Link to={{pathname: `/ingredients/${id}`, state: { background: location }}} className = {styles.link}>
        <div className = {styles.element} style = {{opacity: opacity}} onClick={() => onClick(element)}>
            <div ref={ref} className = 'drag_element'>
            <img className = 'mb-1 ml-4 mr-4' src = {element.image} alt = 'картинка ингредиента'/>
            </div>
                <div className={styles.price}>
                    <p className = ' mb-1 mr-2 text text_type_digits-default'>{element.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            <p className = {`text text_type_main-default ${styles.text}`}>{element.name}</p>
            <Counter count={quantity} size="default" extraClass="m-1" />
        </div>
        </Link>
    )
}

export default Ingredients;