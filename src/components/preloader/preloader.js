import React from 'react'
import styles from './preloader.module.css'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Preloader = ({open}) => {

    const loading = useSelector(store => store.rootReducer.loadingIngredientDetails);

    if (open || loading){
        return (
            <div className={styles.preloader}>
                <div className={styles.preloader__container}>
                    <span className={styles.preloader__round}></span>
                </div>
            </div>
        )
    }
};

Preloader.propTypes = {
    open: PropTypes.bool.isRequired
}

export default Preloader