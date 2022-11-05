import React from 'react';
import { useState ,useEffect } from 'react';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getInfo} from '../../utils/api'

function App() {
  const [data, setData] = useState([])
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null)

useEffect(() => {
  getInfo()
  .then(res => {
    setData(res.data)
  }).catch(err => {
    console.log(err)
  })
}, [])

  const handleOpenOrderDetails = () => {
    setVisibleOrderDetails(true);
  }

  const handleOpenIngredientDetails = (data) => {
    setSelectedIngredient(data);
    setVisibleIngredientDetails(true);
  }

  const handleCloseModal = () => {
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
    setSelectedIngredient(null)
  }

  return (
    <div className="App">
        <AppHeader/>
        <div className={styles.main_content}>
          <BurgerIngredients data = {data} elPopup = {selectedIngredient} isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} onClick = {handleOpenIngredientDetails}/>
          <BurgerConstructor data = {data} isOpen = {visibleOrderDetails} onClose = {handleCloseModal} onClick = {handleOpenOrderDetails}/>
        </div>
    </div>
  );
}

export default App;