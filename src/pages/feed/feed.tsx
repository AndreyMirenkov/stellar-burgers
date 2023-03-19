import React, {FC, useEffect} from 'react';
import FeedList from '../../components/feed-list/feed-list';
import FeedInfo from '../../components/feed-info/feed-info';
import styles from './feed.module.css';
import { useDispatch } from '../../utils/hooks/hooks';
import { useSelector } from '../../utils/hooks/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actionCreators';
import { TDataWatchOrder } from '../../utils/typescriptTypes/watchOrder';

export const WSUrl = 'wss://norma.nomoreparties.space/orders/all'


type TFeed = {
    onClick: (data: TDataWatchOrder) => void;
}

const Feed:FC<TFeed> = ({onClick}) => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.wsReducer.data);

useEffect(() => {
    dispatch(wsConnectionStart(WSUrl));

    return () => {
        dispatch(wsConnectionClosed());
    }
},[dispatch])

    return(
        <div className={styles.content}>
            <FeedList data = {data.orders} onClick = {onClick}/>
            <FeedInfo data = {data}/>
        </div>
    )
}

export default Feed;