import React from 'react';
import { FC } from 'react';
import styles from './preloader.module.css'
import { useSelector } from 'react-redux';

type TPreloader = {
    open: boolean;
}

const Preloader:FC<TPreloader> = ({open}):JSX.Element | null => {

    const loading: boolean = useSelector((store: any) => store.rootReducer.loadingIngredientDetails);

    return(
        <> 
        {(open || loading) && (
        <div className={styles.preloader}>
            <div className={styles.preloader__container}>
                <span className={styles.preloader__round}></span>
            </div>
        </div>
        )}
        </>
        )
};

export default Preloader