import React, {FC} from "react";
import styles from './ingredient-details.module.css';
import {TIngredient} from '../../utils/typescriptTypes/ingredient'

type TIngredientDetails = {
    data: TIngredient;
}

const IngredientDetails: FC<TIngredientDetails> = ({data}) => {
      
    return (
        <div className={styles.content}>
            <img className={styles.img} src = {data.image} alt = 'Картинка'/>
            <h3 className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{data.name}</h3>
            <ul className={`mb-15 text text_type_main-small text_color_inactive ${styles.info}`}>
                <li className={styles.element}>
                    <p className={styles.element_name}>Калории,ккал</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{data.calories}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Белки, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{data.proteins}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Жиры, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{data.fat}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Углеводы, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{data.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;