import React from "react";
import {useEffect} from 'react';
import { useDispatch } from "../../utils/hooks/hooks";
import FeedIdContent from "../../components/feed-idContent/feed-idContent";
import { wsAuthConnectionStart, wsAuthConnectionClosed } from '../../services/actions/ws-authActionCreators';
import { WSAuthUrl} from "../../utils/const/const";
import { useSelector } from "../../utils/hooks/hooks";
import { getCookie } from "../../utils/cookie/cookie";

const FeedAuthId = () => {

    const allOrder = useSelector(store => store.wsAuthReducer.data.orders);
    const dispatch  = useDispatch();

    useEffect(() => {
        const accessToken = getCookie('token');
        dispatch(wsAuthConnectionStart(`${WSAuthUrl}?token=${accessToken}`));
    
        return () => {
            dispatch(wsAuthConnectionClosed());
        }
    },[dispatch])

  
    return(
        <>
            <FeedIdContent allOrder = {allOrder}/>
        </>
    )
}

export default FeedAuthId;