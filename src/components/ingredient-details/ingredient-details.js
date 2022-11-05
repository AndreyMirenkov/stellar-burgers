import React from "react";
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/prop-types'

function IngredientDetails({data}){

    const dataIngredient = ({...data});
      
    return (
        <div className={styles.content}>
            <img className={styles.img} src = {dataIngredient.image} alt = 'Картинка'/>
            <h3 className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{dataIngredient.name}</h3>
            <ul className={`mb-15 text text_type_main-small text_color_inactive ${styles.info}`}>
                <li className={styles.element}>
                    <p className={styles.element_name}>Калории,ккал</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{dataIngredient.calories}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Белки, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{dataIngredient.proteins}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Жиры, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{dataIngredient.fat}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Углеводы, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{dataIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: dataPropTypes.isRequired,
}

export default IngredientDetails;