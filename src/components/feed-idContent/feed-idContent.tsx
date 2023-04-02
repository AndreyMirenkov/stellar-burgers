import React, {FC} from "react";
import styles from './feed-idContent.module.css';
import { useSelector } from "../../utils/hooks/hooks";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import notFound from '../../images/notFound.svg';
import {TIngredient} from '../../utils/typescriptTypes/ingredient'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/typescriptTypes/order";

type TArrayKeys = {
    [key: string]: number;
}

type TUniqueArray = {
    ingredient: TIngredient;
    count: number;
}

type TFeedIdContent = {
    allOrder: Array<TOrder>;
}

const FeedIdContent: FC<TFeedIdContent> = ({allOrder}) => {

    const feedId = useParams<{id: string}>();
    const allIngredients = useSelector(store => store.rootReducer.ingredients);
    const [feed, setFeed] = useState<TOrder | null>(null)
    const [loading, setLoading] = useState(false);  
    const [notFoundFeed, setNotFoundFeed] = useState(false)
    const [textNotFoundFeed, textSetNotFoundFeed] = useState('');
    let array: Array<TUniqueArray>= []
    let price: number = 0;
    let infoDate: string = '';

    const opacity = notFoundFeed ? 1 : 0

    const counts: TArrayKeys = {};
    const arrayUniqueIngredients: string[] = []

    useEffect(() => {
        setNotFoundFeed(false);
        if (allOrder.length !== 0){
        const data = allOrder.findIndex((el) => el._id === feedId.id)
            if (data >= 0){
                setLoading(true);
                textSetNotFoundFeed('')
                setFeed(allOrder[data]);
            } else {
                setLoading(false);
                setNotFoundFeed(true);
                textSetNotFoundFeed('Неправильный id ингредиента. Введите правильный id и попробуйте ещё раз');
            }
        }
    },[allOrder, feedId])


    if (feed !==null && feed.ingredients !== null){
        feed.ingredients?.forEach((el: string) =>  { 
            counts[el] = (counts[el] || 0) + 1; 
        });
        for (var key in counts) {
            arrayUniqueIngredients.push(key)
        }
        arrayUniqueIngredients.forEach(((item: string) =>{ 
            const data = allIngredients.findIndex((el: TIngredient) => el._id === item)
            if (data>= 0) {
                array.push({ingredient: allIngredients[data], count: counts[item]})
            }
        }))
    }

    array.forEach((item) => {
        if (item.ingredient.type === 'bun' && item.count === 1) {
            price = price + item.ingredient.price * 2
        } else {
            price = price + item.ingredient.price * item.count
        }
    })
    if (feed !== null){
        const today = new Date().getTime();
        const createdOrder = new Date(feed.createdAt).getTime();
        const createdOrderHours = new Date(createdOrder).getHours()
        const createdOrderMinutes = new Date(createdOrder).getMinutes();
        if((today - createdOrder) < 86400000){
            infoDate = 'Сегодня, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
        } else if(today - createdOrder >= 86400000 && today - createdOrder < 172800000){
            infoDate = 'Вчера, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
        } else if(today - createdOrder >= 172800000 && today - createdOrder < 432000000){
            infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дня назад, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
        } else if(today - createdOrder >= 432000000){
            infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дней назад, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
        }
    }

    return(
        <>
             {loading && feed !== null
        ?
        <div className={styles.content}>
           <p className={`mb-10 text text_type_digits-default ${styles.number}`}>#{feed.number}</p>
           <h3 className={`mb-3 text text_type_main-medium ${styles.name}`}>{feed.name}</h3>
           <p className={`mb-15 text text_type_main-default ${styles.status}`}>Выполнен</p>
           <p className={`mb-6 text text_type_main-medium ${styles.structure}`}>Состав:</p>
           <ul className={styles.list_ingredient}>{
            array.length !== 0 
            ? 
            array.map((el, index) => (
                <li className={styles.element} key = {index}>
                    <img className={styles.image} src = {el.ingredient.image} alt = 'Картинка'/>
                    <h3 className={`text text_type_main-default ${styles.name_ingredient}`}>{el.ingredient.name}</h3>
                    <div className={styles.price_ingredient}>
                        <p className={`mr-2 text text_type_digits-default`}>{el.ingredient.type === 'bun' && el.count === 1 ? '2 x ' + el.ingredient.price : `${el.count} x ` + el.ingredient.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </li>
            ))  
           :
                <li className={`text text_type_main-default ${styles.element}`}>
                    <p>Ошибка Загрузки данных</p>
                </li>
           }</ul>
           <div className={styles.add_info}>
                <p className={`text text_type_main-default text_color_inactive ${styles.date}`}>{infoDate}</p>
                <div className={styles.price}>
                        <p className={`mr-2 text text_type_digits-default`}>{price}</p>
                        <CurrencyIcon type="primary"/>
                </div>
           </div>
        </div>
        :
        <div className={styles.notFound} style = {{opacity: opacity}}>
            <img src = {notFound} className = {styles.notfound_image} alt = 'Картинка Not Found'/>
            <h2 className={`text text_type_main-medium`}>{textNotFoundFeed}</h2>
        </div>
        }
        </>
    )
}

export default FeedIdContent;