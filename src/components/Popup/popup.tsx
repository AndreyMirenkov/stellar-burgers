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
    const watchElPopup = useSelector((store: any) => store.rootReducer.watchIngredients);
    const watchOrder = useSelector(store => store.wsReducer.watchOrder);
    const watchAuthOrder = useSelector(store => store.wsAuthReducer.watchOrder);
    let data: TDataWatchOrder = watchOrder
    let title: string = '';

    const location = useLocation();
    let ingredietnsPopup = true;

    if (location.pathname.includes('/ingredients')){
        ingredietnsPopup = true
    } else if (location.pathname.includes('/feed')){
        data = watchOrder;
        ingredietnsPopup = false;
        title = '#'+ watchOrder.number;
    } else {
        data = watchAuthOrder;
        ingredietnsPopup = false;
        title = '#'+ watchAuthOrder.number;
    }

   

    return(
        <>
        {isOpen && ( ingredietnsPopup ?

            <Modal onClose={onClose} heading = {true} title={'Детали ингредиента'}>
                <IngredientDetails data = {watchElPopup}/>
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