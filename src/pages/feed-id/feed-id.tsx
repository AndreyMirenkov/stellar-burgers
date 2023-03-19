import React from "react";
import styles from './feed-id.module.css';
import { useSelector } from "../../utils/hooks/hooks";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import { useDispatch } from "../../utils/hooks/hooks";
import notFound from '../../images/notFound.svg';
import {TIngredient} from '../../utils/typescriptTypes/ingredient'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actionCreators';

export const WSUrl = 'wss://norma.nomoreparties.space/orders/all'

const FeedId = () => {

    const dispatch  = useDispatch();
    const feedId: any = useParams();
    const allOrder = useSelector(store => store.wsReducer.data.orders);
    const allIngredients = useSelector(store => store.rootReducer.ingredients);
    const [feed, setFeed] = useState<any>({})
    const [loading, setLoading] = useState(false);  
    const [notFoundFeed, setNotFoundFeed] = useState(false)
    const [textNotFoundFeed, textSetNotFoundFeed] = useState('');
    let array: Array<TIngredient> = []
    let price: number = 0;

    const opacity = notFoundFeed ? 1 : 0

    useEffect(() => {
        dispatch(wsConnectionStart(WSUrl));
    
        return () => {
            dispatch(wsConnectionClosed());
        }
    },[dispatch])
    

    useEffect(() => {
        setNotFoundFeed(false);
        if (allOrder.length !== 0){
        const data = allOrder.findIndex((el: any) => el._id === feedId.id)
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


    if (feed.ingredients!== null){
        feed.ingredients?.forEach(((item: string) =>{ 
            const data = allIngredients.findIndex((el: TIngredient) => el._id === item)
            if (data>= 0) {
                array.unshift(allIngredients[data]);
            }
        }))
    }
    if (array.length && array[0].type === array[array.length-1].type){
        array.splice(array.length-1,1);
    }
    

    array.forEach((item) => {
        if (item.type === 'bun') {
            price = price + item.price * 2
        } else {
            price = price + item.price
        }
    })

    const today: any = new Date()
    const createdOrder: any = new Date(feed.createdAt);
    let infoDate: string = ''
    if((today - createdOrder) < 86400000){
        infoDate = 'Сегодня, ' + (createdOrder.getHours())+':'+(createdOrder.getMinutes()) + ' i-GMT+3'
    } else if(today - createdOrder >= 86400000 && today - createdOrder < 172800000){
        infoDate = 'Вчера, ' + (createdOrder.getHours())+':'+(createdOrder.getMinutes()) + ' i-GMT+3'
    } else if(today - createdOrder >= 172800000 && today - createdOrder < 432000000){
        infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дня назад, ' + (createdOrder.getHours())+':'+(createdOrder.getMinutes()) + ' i-GMT+3'
    } else if(today - createdOrder >= 432000000){
        infoDate = (Math.floor((today - createdOrder)/86400000)) + ' дней назад, ' + (createdOrder.getHours())+':'+(createdOrder.getMinutes()) + ' i-GMT+3'
    }

    return(
        <>
             {loading 
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
                    <img className={styles.image} src = {el.image} alt = 'Картинка'/>
                    <h3 className={`text text_type_main-default ${styles.name_ingredient}`}>{el.name}</h3>
                    <div className={styles.price_ingredient}>
                        <p className={`mr-2 text text_type_digits-default`}>{el.type === 'bun' ? '2 x ' + el.price : '1 x '+el.price}</p>
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

export default FeedId;