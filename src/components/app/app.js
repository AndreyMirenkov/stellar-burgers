import React from 'react';
import { useState ,useEffect } from 'react';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getInfo} from '../../utils/api'
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const [data, setData] = useState([])
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null)

useEffect(() => {
  getInfo()
  .then(res => {
    setData(res.data)
  })
}, [])

  const handleOpenOrderDetails = () => {
    setVisibleOrderDetails(true);
    document.addEventListener('keydown', modalCloseByEscape);
  }

  const handleOpenIngredientDetails = (data) => {
    setSelectedIngredient(data);
    setVisibleIngredientDetails(true);
    document.addEventListener('keydown', modalCloseByEscape);
  }

  const handleCloseModal = () => {
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
  }

  const modalCloseByEscape = (evt) => {
    if(evt.key === 'Escape'){
      document.removeEventListener('keydown', modalCloseByEscape);
      setVisibleOrderDetails(false);
      setVisibleIngredientDetails(false);
    }
  }

  return (
    <div className="App">
        <AppHeader/>
        <div className={styles.main_content}>
          <BurgerIngredients data = {data} onClick = {handleOpenIngredientDetails}/>
          <BurgerConstructor data = {data} onClick = {handleOpenOrderDetails}/>
        </div>
        <OrderDetails isOpen={visibleOrderDetails} onClose = {handleCloseModal}/>
        <IngredientDetails data = {selectedIngredient} isOpen={visibleIngredientDetails} onClose = {handleCloseModal}/>
    </div>
  );
}

export default App;