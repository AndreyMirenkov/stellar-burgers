import React from "react";
import { FC } from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

type TOnClose = {
    onClose: () => void
} 

const ModalOverlay:FC<TOnClose> = ({onClose}) => {

    return(
        <div className={styles.overlay} onClick = {onClose}/>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;