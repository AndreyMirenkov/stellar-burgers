import React from "react";
import styles from './feed-id.module.css';
import {useEffect} from 'react';
import { useDispatch } from "../../utils/hooks/hooks";
import FeedIdContent from "../../components/feed-idContent/feed-idContent";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actionCreators';
import { WSUrl} from "../../utils/const/const";
import { useSelector } from "../../utils/hooks/hooks";

const FeedId = () => {

    const allOrder = useSelector(store => store.wsReducer.data.orders);
    const dispatch  = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(wsConnectionStart(WSUrl)),10);
    
        return () => {
            dispatch(wsConnectionClosed());
        }
    },[dispatch])

  
    return(
        <>
            <FeedIdContent allOrder = {allOrder}/>
        </>
    )
}

export default FeedId;