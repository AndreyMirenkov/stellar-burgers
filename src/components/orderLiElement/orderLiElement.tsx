import React, {FC} from "react";
import styles from './orderLiElement.module.css';
import { useSelector } from "../../utils/hooks/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/typescriptTypes/ingredient";
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from "../../utils/typescriptTypes/order";
import { TDataWatchOrder } from "../../utils/typescriptTypes/watchOrder";


type TOrderLiElement = {
    data: TOrder;
    onClick: (data: TDataWatchOrder, userOrder: boolean) => void;
    profileOrder?: boolean 
}

type TArrayKeys = {
    [key: string]: number;
}

type TUniqueArray = {
    ingredient: TIngredient;
    count: number;
}

const OrderLiElement:FC<TOrderLiElement> = ({data, onClick, profileOrder = false}) => {

    const allIngredients = useSelector(store => store.rootReducer.ingredients);
    let location = useLocation();
    const {_id, name, number, ingredients, status, createdAt} = data
    let array: Array<TUniqueArray>= []
    let price: number = 0;
    let addQuantity: string = ''; 
    let pathname: string = profileOrder ? '/profile/orders' : '/feed';

    const width = profileOrder ? '796px' : '536px'

    const counts: TArrayKeys = {};
    ingredients.forEach((el) =>  { 
        counts[el] = (counts[el] || 0) + 1; 
    });
    const arrayUniqueIngredients: string[] = []
    for (var key in counts) {
        arrayUniqueIngredients.push(key)
    }


    arrayUniqueIngredients.forEach((item =>{ 
        const data = allIngredients.findIndex((el: TIngredient) => el._id === item)
        if (data>= 0 ) {
            array.push({ingredient: allIngredients[data], count: counts[item]})
          }
    }))
    if (array.length > 6){
        addQuantity = '+' + (array.length-5);
    }


    array.forEach((item) => {
        if (item.ingredient.type === 'bun' && item.count === 1) {
            price = price + item.ingredient.price * 2
        } else {
            price = price + item.ingredient.price * item.count
        }
    })


const today = new Date().getTime();
const createdOrder = new Date(createdAt).getTime();
const createdOrderHours = new Date(createdOrder).getHours()
const createdOrderMinutes = new Date(createdOrder).getMinutes();
let infoDate: string = ''
if((today - createdOrder) < 86400000){
    infoDate = 'Сегодня, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
} else if(today - createdOrder >= 86400000 && today - createdOrder < 172800000){
    infoDate = 'Вчера, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
} else if(today - createdOrder >= 172800000 && today - createdOrder < 432000000){
    infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дня назад, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
} else if(today - createdOrder >= 432000000){
    infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дней назад, ' + (createdOrderHours)+':'+(createdOrderMinutes) + ' i-GMT+3'
}

let statusText: string = ''
let styleStatus: string = ''
if (status === 'done'){
    styleStatus = '#00CCCC'
    statusText = 'Выполнен';
} else if(status === 'pending') {
    statusText = 'В процессе';
} else if (status === 'created'){
    statusText = 'Создан';
} else {
    statusText = status;
    styleStatus = 'red'
}
 
const watchOrder = {
    number,
    name,
    data: array,
    infoDate,
    price,
    statusText,
    styleStatus
}


    return(
        <Link to={{pathname: `${pathname}/${_id}`, state: { background: location }}} className = {styles.link}>
        <li className={styles.content} style = {{width: width}} onClick = {() => onClick(watchOrder, profileOrder)}>
            <div className={styles.info}>
                <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
                <p className={`text text_type_main-small text_color_inactive ${styles.date}`}>{infoDate}</p>
            </div>
            <div>
            <h3 className={`text text_type_main-medium ${styles.name}`}>{name}</h3>
            {profileOrder && <p className={`mt-2 text text_type_main-default ${styles.status}`} style = {{color: styleStatus}}>{statusText}</p>}
            </div>
            <div className={styles.ingredients}>
                <ul className={styles.images}>{
                    array.map((el, index) => {
                        if (index > 5 || !el){
                            return null;
                        }
                        return ( array.length > 6 && index === 5 ?
                        <li className={styles.border_image} key = {index}>
                            <img className={styles.image} src = {el.ingredient.image} alt = 'Картинка' style = {{opacity: 0.6}}/>
                            <p className={`text text_type_main-default ${styles.add_quantity}`}>{addQuantity}</p>
                        </li>
                        :
                        <li className={styles.border_image} key = {index}>
                            <img className={styles.image} src = {el.ingredient.image} alt = 'Картинка'/>
                        </li>
                        )
                    })  
                }</ul>
                <div className={styles.price}>
                    <p className={`mr-2 text text_type_digits-default`}>{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </li>
        </Link>
    )
}

export default OrderLiElement;