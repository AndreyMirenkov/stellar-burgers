import React from "react";
import { createPortal } from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal({children, onClose, heading }){

    
    return createPortal(
        <>
        <div className={styles.modal}>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal_field}>
            {heading && <h2 className={`text text_type_main-large ${styles.text}`}>Детали ингредиента</h2>}
            <button className={styles.button_close} type= "button" onClick={onClose}/>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
        
      </>,
      modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    heading: PropTypes.bool.isRequired,
}

export default Modal;
