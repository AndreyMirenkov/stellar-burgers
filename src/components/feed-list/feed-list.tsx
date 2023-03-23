import React, {FC} from "react";
import styles from './feed-list.module.css'
import OrderLiElement from "../orderLiElement/orderLiElement";
import { TOrder } from "../../utils/typescriptTypes/order";
import { TDataWatchOrder } from "../../utils/typescriptTypes/watchOrder";

type TFeedList = {
    data: Array<TOrder>;
    onClick: (data: TDataWatchOrder, userOrder: boolean) => void;
}

const FeedList: FC<TFeedList> = ({data, onClick}) => {

    return(
        <div className={styles.content}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
            <ul className= {styles.list}>
                {data.length !== 0 ? 
                    data.map((el, index) => (
                    <OrderLiElement key = {el._id} data = {el} onClick = {onClick}/>
                ))
                :
                    <li className = {`text text_type_main-default ${styles.drop_container_main}`}>
                        Список закозов пуст. Успейте заказать первым!
                    </li>}
                </ul>
        </div>
    )
}

export default FeedList;