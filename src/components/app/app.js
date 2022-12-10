import React from 'react';
import { useState ,useEffect } from 'react';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {useDispatch, useSelector} from 'react-redux'
import {getApiIngredients, getApiNumberOrder} from '../../services/actionCreators';
import { watchIngredient, deleteWatchIngredient, deleteConstructorIngredients } from '../../services/actionCreators';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Preloader from '../preloader/preloader';

export let successes = false;

function App() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [openPreloader, setOpenPreloader] = useState(false);
  const dispatch = useDispatch();
  const buns = useSelector(store => store.ingredientsInConstructor.buns);
  const bunsId = buns.map(item => item._id);
  const main = useSelector(store => store.ingredientsInConstructor.ingredients);
  const mainId  = main.map(item => item.details._id);

  const opacity = openPreloader ? 0.5 : 1

useEffect(() => {
  setOrderData([...bunsId, ...mainId, ...bunsId]);
},[buns, main])

useEffect(() => {
  dispatch(getApiIngredients())
},[dispatch])

  const handleOpenOrderDetails = () => {
    setOpenPreloader(true);
    dispatch(getApiNumberOrder(orderData))
    setTimeout(() => {
      setOpenPreloader(false)
      setVisibleOrderDetails(true)
      dispatch(deleteConstructorIngredients())},500);
  }


  const handleOpenIngredientDetails = (data) => {
    dispatch(watchIngredient(data));
    setVisibleIngredientDetails(true);
  }

  const handleCloseModal = () => {
    dispatch(deleteWatchIngredient());
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
  }

  return (
    <div className="App">
        <AppHeader/>
        <Preloader open = {openPreloader}/>
        <main className={styles.main_content} style = {{opacity}}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} onClick = {handleOpenIngredientDetails}/>
            <BurgerConstructor isOpen = {visibleOrderDetails} onClose = {handleCloseModal} onClick = {handleOpenOrderDetails}/>
          </DndProvider>
        </main>
    </div>
  );
}

export default App;