import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { loadingIngredientDetails, finishLoadingIngredientDetails } from "../../services/actionCreators";
import notFound from '../../images/notFound.svg';

function IngredientDetails(){
    const dispatch  = useDispatch();
    const ingredientId = useParams();
    const ingredients = useSelector(store => store.rootReducer.ingredients);
    const [ingredient, setIngredient] = useState([])
    const [loading, setLoading] = useState(false);  
    const [notFoundIngredient, setNotFoundIngredient] = useState(false)

    const opacity = notFoundIngredient ? 1 : 0

    useEffect(() => {
        setNotFoundIngredient(false);
        dispatch(loadingIngredientDetails());
        if (ingredients.length !== 0){
        const data = ingredients.filter(el => el._id === ingredientId.id)
            if (data.length !== 0){
            setIngredient(data)
            } else {
                setLoading(false);
                setNotFoundIngredient(true);
                setNotFoundIngredient('Неправильный id ингредиента. Введите правильный id и попробуйте ещё раз');
                dispatch(finishLoadingIngredientDetails());
            }
        }
    },[ingredientId, ingredients])


    useEffect(() => {
        if(ingredient.length !==0){
            setLoading(true);
            setNotFoundIngredient('')
            dispatch(finishLoadingIngredientDetails());
        }
    },[ingredient])


    return (
        <>
        {loading 
        ?
        <div className={styles.content}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
            <img className={styles.img} src = {ingredient[0].image} alt = 'Картинка'/>
            <h3 className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{ingredient[0].name}</h3>
            <ul className={`mb-15 text text_type_main-small text_color_inactive ${styles.info}`}>
                <li className={styles.element}>
                    <p className={styles.element_name}>Калории,ккал</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{ingredient[0].calories}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Белки, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{ingredient[0].proteins}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Жиры, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{ingredient[0].fat}</p>
                </li>
                <li className={styles.element}>
                    <p className={styles.element_name}>Углеводы, г</p>
                    <p className={`text_type_digits-default ${styles.element_value}`}>{ingredient[0].carbohydrates}</p>
                </li>
            </ul>
        </div>
        :
        <div className={styles.notFound} style = {{opacity: opacity}}>
            <img src = {notFound} className = {styles.notfound_image} alt = 'Картинка Not Found'/>
            <h2 className={`text text_type_main-medium`}>{notFoundIngredient}</h2>
        </div>
        }
        </>        
    );
}

export default IngredientDetails;