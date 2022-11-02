import React from 'react';
import { useState, useEffect } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(){

const [sum, setSum] = useState(0)

useEffect(() => {
    const el = document.querySelectorAll('.constructor-element__price')
    let total = 0
    el.forEach((e) => (
        total = total + Number(e.textContent)
    ))
    setSum(total)
}, [])

    return(
        <section className={`mt-25 ${styles.content}`}>
            <div style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div className='ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />
                </div>
                <ul className= {styles.fill} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Говяжий метеорит (отбивная)"
                    price={3000}
                    thumbnail='https://code.s3.yandex.net/react/code/meat-04.png'
                />
                </li>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Соус Spicy-X"
                    price={90}
                    thumbnail='https://code.s3.yandex.net/react/code/sauce-02.png'
                />
                </li>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={1337}
                    thumbnail='https://code.s3.yandex.net/react/code/meat-02.png'
                />
                </li>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Соус фирменный Space Sauce"
                    price={80}
                    thumbnail='https://code.s3.yandex.net/react/code/sauce-04.png'
                />
                </li>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Хрустящие минеральные кольца"
                    price={300}
                    thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
                />
                </li>
                <li className={`ml-4 mr-4 ${styles.fill__element}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text="Сыр с астероидной плесенью"
                    price={4142}
                    thumbnail='https://code.s3.yandex.net/react/code/cheese.png'
                />
                </li>
                </ul>
                <div className='ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />
                </div>
            </div>
            <div className={`mt-10 mr-4 ${styles.infoorder}`}>
                <div className={`mr-10 ${styles.price}`}>
                <p className='mr-2 text text_type_digits-medium'>{sum}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor