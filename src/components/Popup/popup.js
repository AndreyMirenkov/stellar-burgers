import React from 'react'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

function Popup({isOpen, onClose}){
   
    const watchElPopup = useSelector(store => store.rootReducer.watchIngredients);

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

Popup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}


export default Popup;