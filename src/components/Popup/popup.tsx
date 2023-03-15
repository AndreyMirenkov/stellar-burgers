import React, {FC} from 'react'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector } from "react-redux";

type TPopup = {
    isOpen: boolean;
    onClose: () => void;
}

const Popup:FC<TPopup> = ({isOpen, onClose}) => {
   
    const watchElPopup = useSelector((store: any) => store.rootReducer.watchIngredients);

    return(
        <>
        {isOpen && (
            <Modal onClose={onClose} heading = {true} title={'Детали ингредиента'}>
                <IngredientDetails data = {watchElPopup}/>
            </Modal>
        )}
        </>
    )
}

export default Popup;