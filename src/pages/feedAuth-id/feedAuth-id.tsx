import React from "react";
import {useEffect} from 'react';
import { useDispatch } from "../../utils/hooks/hooks";
import FeedIdContent from "../../components/feed-idContent/feed-idContent";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actionCreators';
import { WSAuthUrl} from "../../utils/const/const";
import { useSelector } from "../../utils/hooks/hooks";
import { getCookie } from "../../utils/cookie/cookie";

const FeedAuthId = () => {

    const allOrder = useSelector(store => store.wsReducer.data.orders);
    const dispatch  = useDispatch();

    useEffect(() => {
        const accessToken = getCookie('token');
        setTimeout(() => dispatch(wsConnectionStart(`${WSAuthUrl}?token=${accessToken}`)),10);
    
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

export default FeedAuthId;