import {FC} from 'react'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderPopup from '../order-popup/order-popup';
import { useSelector } from '../../utils/hooks/hooks';
import { useLocation } from 'react-router-dom';

type TPopup = {
    isOpen: boolean;
    onClose: () => void;
}

const Popup:FC<TPopup> = ({isOpen, onClose}) => {
    const watchElPopup = useSelector((store) => store.rootReducer.watchIngredients);
    const watchOrder = useSelector(store => store.wsReducer.watchOrder);
    let title: string = '';

    const location = useLocation();
    let ingredietnsPopup = true;

    if (location.pathname.includes('/ingredients')){
        ingredietnsPopup = true
    } else {
        title = '#'+ watchOrder.number;
        ingredietnsPopup = false;
    }

    return(
        <>
        {isOpen && ( ingredietnsPopup ?
                watchElPopup !== null &&
                    <Modal onClose={onClose} heading = {true} title={'Детали ингредиента'}>
                        <IngredientDetails data = {watchElPopup}/>
                    </Modal> 
            :
            <Modal onClose={onClose} heading = {true} title={title} style = {'text text_type_digits-default'}>
                <OrderPopup data = {watchOrder}/>
            </Modal>
        )}
        </>
    )
}

export default Popup;