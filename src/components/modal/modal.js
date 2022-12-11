import React from "react";
import { useEffect } from "react";
import { createPortal } from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");

function Modal({children, onClose, heading, title }){

    useEffect(() => {
        document.addEventListener("keydown", handleClickEscape);
    
        return () => document.removeEventListener("keydown", handleClickEscape);
      }, []);

    const handleClickEscape = (evt) =>{
        if(evt.key === 'Escape'){
            onClose();
        }
    } 

    return createPortal(
        <>
        <div className={styles.modal}>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal_field}>
            {heading && 
            <h2 className={`text text_type_main-large ${styles.text}`}>{title}</h2>}
            <button className={styles.button_close} type= "button">
                <CloseIcon type="primary" onClick={onClose}/>
            </button>
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
    title: PropTypes.string,
}

export default Modal;
