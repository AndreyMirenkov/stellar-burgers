import React, {FC} from 'react';
import styles from './orders.module.css';
import {useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from '../../utils/hooks/hooks';
import OrderLiElement from '../../components/orderLiElement/orderLiElement';
import { TDataWatchOrder } from '../../utils/typescriptTypes/watchOrder';
import { useDispatch } from '../../utils/hooks/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actionCreators';
import { getCookie } from '../../utils/cookie/cookie';

export const WSUrl = 'wss://norma.nomoreparties.space/orders' 

type TOrders = {
    onClick: (data: TDataWatchOrder) => void
    logoutProfile: () => void;
}

const Orders:FC<TOrders> = ({onClick, logoutProfile}) => {

    const dispatch = useDispatch();
    const data = useSelector(store => store.wsReducer.data.orders);
    useEffect(() => {
        const accessToken = getCookie('token');
        dispatch(wsConnectionStart(`${WSUrl}?token=${accessToken}`));
    
        return () => {
            dispatch(wsConnectionClosed());
        }
    },[dispatch])


    const handleExit = () => {
        logoutProfile();
    }

    return(
        <div className={styles.content}>
            <div>
                <nav className={`mb-20 mr-15 ${styles.navigation}`}>
                    <NavLink exact to = '/profile' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link}>Профиль</NavLink>
                    <NavLink to = '/profile/orders' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link}>История заказов</NavLink>
                    <NavLink to = '/login' className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName = {styles.active_link} onClick = {handleExit}>Выход</NavLink>
                </nav>
                <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                   В этом разделе вы можете просмотреть свою историю заказов
                </p>
            </div>

            <ul className= {styles.list}>
                {data.length > 0 ? 
                    data.map((el, index) => (
                    <OrderLiElement key = {el._id} data = {el} onClick = {onClick} profileOrder = {true}/>
                ))
                :
                    <li className = {`text text_type_main-default ${styles.drop_container_main}`}>
                        Список закозов пуст. Успейте заказать первым!
                    </li>}
                </ul>
    
        </div>
    )
}


export default Orders;