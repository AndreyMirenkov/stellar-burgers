import React from "react";
import {useEffect, useState} from 'react';
import styles from './not-found.module.css';
import pages404_1 from '../../images/pages404(1).svg'
import pages404_2 from '../../images/pages404(2).svg'
import pages404_3 from '../../images/pages404(3).svg'
import pages404_4 from '../../images/pages404(4).svg'
import pages404_5 from '../../images/pages404(5).svg'
import pages404_6 from '../../images/pages404(6).svg'
import pages404_7 from '../../images/pages404(7).svg'
import pages404_8 from '../../images/pages404(8).svg'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const dataImg = [
    pages404_1, pages404_2, pages404_3, pages404_4, pages404_5, pages404_6, pages404_7, pages404_8
]

function NotFound() {

    const min = 0;
    const max = 7;
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false)

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        setLoading(false)
        setNumber(random(min, max))
        setTimeout(() =>{
            setLoading(true);
        },100)
    },[])

    function buttonClick(e){
        e.preventDefault();
        window.history.back();
    }

    return (
        loading && <div className={styles.content}>
            <img src = {dataImg[number]} alt = 'Картинка ингредиента' className={styles.img}/>
            <h2 className={`mb-8 text text_type_main-large ${styles.title}`}>Not Found</h2>
            <h3 className={`mb-8 text text_type_main-large ${styles.title}`}>404</h3>
            <Button htmlType="button" type="primary" size="small" onClick={buttonClick}>Назад</Button>
        </div>
    )
}

export default NotFound;