import React from "react";
import styles from './ingredients-category.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

function IngredientsCategory({text, price, thumbnail}){

    return(
        <li className={`ml-4 mr-4 ${styles.fill__element}`}>
            <DragIcon type="primary" />
            <ConstructorElement
                text = {text}
                price = {price}
                thumbnail= {thumbnail}
            />
        </li>
    )
}

IngredientsCategory.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
}

export default IngredientsCategory;