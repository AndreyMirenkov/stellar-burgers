import {FC} from 'react'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderPopup from '../order-popup/order-popup';
import { useSelector } from '../../utils/hooks/hooks';
import { useLocation } from 'react-router-dom';
import { TDataWatchOrder } from '../../utils/typescriptTypes/watchOrder';

type TPopup = {
    isOpen: boolean;
    onClose: () => void;
}

const Popup:FC<TPopup> = ({isOpen, onClose}) => {
    const watchElPopup = useSelector((store) => store.rootReducer.watchIngredients);
    const watchOrder = useSelector(store => store.wsReducer.watchOrder);
    const watchAuthOrder = useSelector(store => store.wsAuthReducer.watchOrder);
    const watchIngredientLocalStorage = JSON.parse(localStorage.getItem('WatchIngredient') || '{}');
    let data: TDataWatchOrder = watchOrder
    let title: string = '';

    const location = useLocation();
    let ingredietnsPopup = true;

    if (location.pathname.includes('/ingredients')){
        ingredietnsPopup = true
    } else if (location.pathname.includes('/feed')){
        if(watchOrder.number !== null){
            data = watchOrder;
            title = '#'+ watchOrder.number;
        } else {
            data = JSON.parse(localStorage.getItem('WatchFeed') || '{}')
            title = '#'+ data.number;
        }
        ingredietnsPopup = false;
    } else {
        if(watchAuthOrder.number !== null){
            data = watchAuthOrder;
            title = '#'+ watchAuthOrder.number;
        } else {
            data = JSON.parse(localStorage.getItem('WatchFeed') || '{}');
            title = '#'+ data.number;
        }
        ingredietnsPopup = false;
    }

    return(
        <>
        {isOpen && ( ingredietnsPopup ?
                watchElPopup !== null ?
                    <Modal onClose={onClose} heading = {true} title={'Детали ингредиента'}>
                        <IngredientDetails data = {watchElPopup}/>
                    </Modal> 
                    :
                    <Modal onClose={onClose} heading = {true} title={'Детали ингредиента'}>
                        <IngredientDetails data = {watchIngredientLocalStorage}/>
                    </Modal>
            :
            <Modal onClose={onClose} heading = {true} title={title} style = {'text text_type_digits-default'}>
                <OrderPopup data = {data}/>
            </Modal>
        )}
        </>
    )
}

export default Popup;