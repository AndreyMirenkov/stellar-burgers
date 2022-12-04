import React from 'react';
import { useState ,useEffect } from 'react';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getInfo, getNumberOrder} from '../../utils/api'
import {useDispatch, useSelector} from 'react-redux'
import {WATCH_INGREDIENTS, DELETE_WATCH_INGREDIENTS, getIngredients, GET_AND_UPDATE_ORDER} from '../../services/action';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();
  const buns = useSelector(store => store.ingredientsInConstructor.buns);
  const bunsId = buns.map(item => item._id);
  const main = useSelector(store => store.ingredientsInConstructor.ingredients);
  const mainId  = main.map(item => item._id);


useEffect(() => {
  setOrderData([...bunsId, ...mainId, ...bunsId]);
},[buns, main])

useEffect(() => {
  dispatch(getIngredients())
},[dispatch])


  const handleOpenOrderDetails = () => {
    return getNumberOrder(orderData)
    .then(res => {
      dispatch({type: GET_AND_UPDATE_ORDER, number: res.order.number, name: res.name});
      setVisibleOrderDetails(true);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleOpenIngredientDetails = (data) => {
    dispatch({type: WATCH_INGREDIENTS, data})
    setVisibleIngredientDetails(true);
  }

  const handleCloseModal = () => {
    dispatch({type: DELETE_WATCH_INGREDIENTS})
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
  }

  return (
    <div className="App">
        <AppHeader/>
        <div className={styles.main_content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} onClick = {handleOpenIngredientDetails}/>
            <BurgerConstructor isOpen = {visibleOrderDetails} onClose = {handleCloseModal} onClick = {handleOpenOrderDetails}/>
          </DndProvider>
        </div>
    </div>
  );
}

export default App;