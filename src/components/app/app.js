import React from 'react';
import { useState ,useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import {useDispatch, useSelector} from 'react-redux'
import {getApiIngredients, getApiNumberOrder} from '../../services/actionCreators';
import { watchIngredient, deleteWatchIngredient, deleteConstructorIngredients } from '../../services/actionCreators';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Preloader from '../preloader/preloader';
import ProtectedRoute from '../ProtectedRoute.js/ProtectedRoute';
import { apiRegisterUser, apiLoginUser, apiUpdateProfile, 
  apiLogoutUser, apiGetProfile, apiUpdateToken, apiForgotPassword, 
  apiResetPassword, actionResetLinkClickPage, actionClickOnIngredient, 
  actionResetClickOnIngredient, actionResetSuccessNewPassword } from '../../services/auth-actionCreators';
import { deleteCookie } from '../../utils/cookie';
import IngredientDetails from '../../pages/ingredients-details/ingredient-details';
import NotFound from '../../pages/not-found/not-found';
import Popup from '../Popup/popup';

function App() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [openPreloader, setOpenPreloader] = useState(false);
  const dispatch = useDispatch();
  const buns = useSelector(store => store.rootReducer.ingredientsInConstructor.buns);
  const bunsId = buns.map(item => item._id);
  const main = useSelector(store => store.rootReducer.ingredientsInConstructor.ingredients);
  const mainId  = main.map(item => item.details._id);
  const timeToken = useSelector(store => store.authReducer.token.time);
  const token = useSelector(store => store.authReducer.token.refreshToken);
  const loggedIn = useSelector(store => store.authReducer.loggedIn);
  const transition = useSelector(store => store.authReducer.linkToPage.transition)
  const transitionLink = useSelector(store => store.authReducer.linkToPage.link);
  const clickOnIngredient = useSelector(store => store.authReducer.linkForPopup.clickOnIngredient);
  const openResetPassword = useSelector(store => store.authReducer.openResetPassword.inputEmailOnForgotPage)
  const successResetPassword = useSelector(store => store.authReducer.resetPassword);
  const history = useHistory();

  const opacity = openPreloader ? 0.5 : 1

useEffect(() => {
  setOrderData([...bunsId, ...mainId, ...bunsId]);
},[buns, main])

useEffect(() => {
  dispatch(getApiIngredients())
},[dispatch])

useEffect(() => {
  const token = JSON.parse(localStorage.getItem('refreshToken'))
  if (token && loggedIn === false){
    dispatch(apiUpdateToken(token))
    setTimeout(() => {
      dispatch(apiGetProfile())},1000);
  }
},[])

useEffect(() => {
  if (openResetPassword){
    history.push('/reset-password');
  }  else if (!openResetPassword && successResetPassword){
    history.push('/login');
    setTimeout(() => {
      dispatch(actionResetSuccessNewPassword());
    },1000);
  }
},[openResetPassword, history, successResetPassword, dispatch])

// useEffect(() => {
//   if (loggedIn){
//       history.push('/')
//   }
// },[history,loggedIn])

useEffect(() => {
  if (loggedIn && transition){
     setTimeout(() => {
      history.push(`/${transitionLink}`)
      dispatch(actionResetLinkClickPage())
    },50)
  }
},[history, transitionLink, loggedIn, transition])

  const handleOpenOrderDetails = () => {
    if (loggedIn){
    setOpenPreloader(true);
    dispatch(getApiNumberOrder(orderData))
    setTimeout(() => {
      setOpenPreloader(false)
      setVisibleOrderDetails(true)
      dispatch(deleteConstructorIngredients())},500);
    } else {
      history.push('/login');
    }
  }


  const handleOpenIngredientDetails = (data) => {
    dispatch(actionClickOnIngredient())
    dispatch(watchIngredient(data));
    setVisibleIngredientDetails(true);
  }

  const handleCloseModal = () => {
    dispatch(actionResetClickOnIngredient())
    dispatch(deleteWatchIngredient());
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
    history.push('/')

  }

  const handleRegister = (name, email, password) => {
    dispatch(apiRegisterUser(name, email, password));
  }

  const handleLogin = (email, password) => {
    dispatch(apiLoginUser(email, password));
  }

  const getProfile = () => {
    const nowTime = new Date()
    setOpenPreloader(true);
    if (timeToken && nowTime - timeToken > 1200000){
      dispatch(apiUpdateToken(token))
      setTimeout(() => {
        setOpenPreloader(false)
        dispatch(apiGetProfile())},500);
    } else {
      dispatch(apiGetProfile())
      setOpenPreloader(false);
    }
  }

  const updateProfile = (name, email) => {
    const nowTime = new Date()
    setOpenPreloader(true);
    if (nowTime - timeToken > 1200000){
      dispatch(apiUpdateToken(token))
      setTimeout(() => {
        setOpenPreloader(false)
        dispatch(apiUpdateProfile(name, email))},500);
    } else {
      dispatch(apiUpdateProfile(name, email));
      setOpenPreloader(false);
    }
  }

  const logoutProfile = () => {
    dispatch(apiLogoutUser(token));
    deleteCookie('token');
    localStorage.removeItem('refreshToken')
    setTimeout(() => {
      history.push('/login')
    },1000)
  }

  const forgotPassword = (email) => {
    dispatch(apiForgotPassword(email));
  }

  const resetPassword = (password, verificationЕoken) => {
    dispatch(apiResetPassword(password, verificationЕoken));
  }


  return (
    <div className="App">
        <AppHeader/>
        <Preloader open = {openPreloader}/>
        <Switch>
          <ProtectedRoute exact path = '/register' authorize={false}>
            <Register handleRegister = {handleRegister}/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/login' authorize={false}>
            <Login handleLogin = {handleLogin}/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/forgot-password' authorize={false}>
            <ForgotPassword forgotPassword = {forgotPassword}/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/reset-password' authorize={false}>
            {openResetPassword || successResetPassword ?  <ResetPassword resetPassword = {resetPassword}/> : <Redirect to = '/forgot-password'/>}
          </ProtectedRoute>

          <ProtectedRoute path = '/profile' authorize={true}>
            <Profile getProfile = {getProfile} updateProfile = {updateProfile} logoutProfile = {logoutProfile}/>
          </ProtectedRoute>
         
          <Route exact path = '/'>
            <main className={styles.main_content} style = {{opacity}}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} onClick = {handleOpenIngredientDetails}/>
                <BurgerConstructor isOpen = {visibleOrderDetails} onClose = {handleCloseModal} onClick = {handleOpenOrderDetails}/>
              </DndProvider>
            </main>
          </Route>

          <Route exact path = '/ingredients/:id'>
            {clickOnIngredient ?
              <Popup isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} />
            :
              <IngredientDetails/> 
            }
          </Route>

          <Route path = '/*'>
            <NotFound/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;