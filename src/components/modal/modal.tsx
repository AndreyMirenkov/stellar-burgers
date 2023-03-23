import React from "react";
import { FC } from "react";
import { useEffect } from "react";
import { createPortal } from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type TModal = {
    onClose: () => void;
    heading: boolean;
    title?: string | number;
    style?: string;
}

const Modal:FC<React.PropsWithChildren<TModal>> = ({children, onClose, heading, title, style = null }) => {

    useEffect(() => {
        document.addEventListener("keydown", handleClickEscape);
    
        return () => document.removeEventListener("keydown", handleClickEscape);
      }, []);

    const handleClickEscape = (evt: KeyboardEvent): void =>{
        if(evt.key === 'Escape'){
            onClose();
        }
    } 

   const styleHeading =  style !== null ? style :  'text text_type_main-large'
   const width = style !== null ? '640px' : '520px'

    return createPortal(
        <>
        <div className={styles.modal}>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal_field}>
            {heading && 
            <h2 className={`${styleHeading} ${styles.text}`}>{title}</h2>}
            <button className={styles.button_close} type= "button">
                <CloseIcon type="primary" onClick={onClose}/>
            </button>
                <div className={styles.content} style = {{width: width}}>
                    {children}
                </div>
            </div>
        </div>
        
      </>,
      modalRoot
    )
}

export default Modal;
