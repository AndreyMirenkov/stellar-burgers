import React from 'react';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {data} from '../../utils/data'

function App() {
  return (
    <div className="App">
        <AppHeader/>
        <div className={styles.main_content}>
          <BurgerIngredients data = {data}/>
          <BurgerConstructor data = {data}/>
        </div>
    </div>
  );
}

export default App;