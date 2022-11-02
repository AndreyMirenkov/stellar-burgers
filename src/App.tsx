import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {data} from './utils/data'

function App() {
  return (
    <div className="App">
        <AppHeader/>
        <div style ={{display: 'flex', justifyContent: 'center', gap: '40px'}}>
          <BurgerIngredients data = {data}/>
          <BurgerConstructor/>
        </div>
    </div>
  );
}

export default App;
