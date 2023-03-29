import React from 'react';
import { useState ,useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import styles from  './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Feed from '../../pages/feed/feed';
import FeedId from '../../pages/feed-id/feed-id';
import FeedAuthId from '../../pages/feedAuth-id/feedAuth-id';
import Orders from '../../pages/orders/orders';
import { useSelector } from '../../utils/hooks/hooks';
import { useDispatch } from '../../utils/hooks/hooks';
import {getApiIngredients, getApiNumberOrder} from '../../services/actions/actionCreators';
import { watchIngredient, deleteWatchIngredient, deleteConstructorIngredients } from '../../services/actions/actionCreators';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Preloader from '../preloader/preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { apiRegisterUser, apiLoginUser, apiUpdateProfile, 
  apiLogoutUser, apiGetProfile, apiUpdateToken, apiForgotPassword, 
  apiResetPassword, actionResetSuccessNewPassword } from '../../services/actions/auth-actionCreators';
import { wsWatchOrder, wsDeleteWatchOrder } from '../../services/actions/ws-actionCreators';
import { wsAuthWatchOrder, wsAuthDeleteWatchOrder } from '../../services/actions/ws-authActionCreators';
import { deleteCookie, getCookie } from '../../utils/cookie/cookie';
import IngredientDetails from '../../pages/ingredients-details/ingredient-details';
import NotFound from '../../pages/not-found/not-found';
import Popup from '../Popup/popup';
import { TIngredient } from '../../utils/typescriptTypes/ingredient';
import { TDataWatchOrder } from '../../utils/typescriptTypes/watchOrder';

type TMainIngredient = {
  details: TIngredient;
  key: number;
}

function App() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const [visibleFeedDetails, setVisibleFeedDetails] = useState(false);
  const [orderData, setOrderData] = useState<Array<string>>([]);
  const [openPreloader, setOpenPreloader] = useState(false);
  const dispatch: any = useDispatch();
  const buns: Array<TIngredient> = useSelector(store => store.rootReducer.ingredientsInConstructor.buns);
  const bunsId = buns.map((item: TIngredient) => item._id);
  const main: Array<TMainIngredient> = useSelector((store: any) => store.rootReducer.ingredientsInConstructor.ingredients);
  const mainId  = main.map(item=> item.details._id);
  const timeToken = useSelector(store => store.authReducer.token.time);
  const token = useSelector((store: any) => store.authReducer.token.refreshToken);
  const loggedIn = useSelector(store => store.authReducer.loggedIn);
  const openResetPassword = useSelector(store => store.authReducer.openResetPassword.inputEmailOnForgotPage)
  const successResetPassword = useSelector(store => store.authReducer.resetPassword);
  const history = useHistory();
  const location: any = useLocation();
  let background = location.state && location.state.background;

  const opacity = openPreloader ? 0.5 : 1


useEffect(() => {
  setOrderData([...bunsId, ...mainId, ...bunsId]);
},[buns, main])

useEffect(() => {
  dispatch(getApiIngredients())
},[dispatch])

useEffect(() => {
  if (localStorage.getItem('refreshToken') !== null) {
  const token = JSON.parse(localStorage.getItem('refreshToken') || '{}')
  if (token && loggedIn === false){
    dispatch(apiUpdateToken(token))
    setTimeout(() => {
      dispatch(apiGetProfile())},1000);
  }
}
},[])

// useEffect(() => {
//   if (localStorage.getItem('refreshToken') !== null && getCookie('token')){
//   dispatch(apiGetProfile());
//   }
// },[dispatch])

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


  const handleOpenIngredientDetails = (data: TIngredient) => {
    dispatch(watchIngredient(data));
    setVisibleIngredientDetails(true);
  }

  const handleCloseModal = () => {
    dispatch(deleteWatchIngredient());
    dispatch(wsDeleteWatchOrder());
    dispatch(wsAuthDeleteWatchOrder());
    setVisibleOrderDetails(false);
    setVisibleIngredientDetails(false);
    setVisibleFeedDetails(false);
    if (location.pathname !== '/'){
      window.history.back();
    }
  }

  const handleRegister = (name: string, email: string, password: string) => {
    dispatch(apiRegisterUser(name, email, password));
  }

  const handleLogin = (email: string, password: string) => {
    dispatch(apiLoginUser(email, password));
  }

  const getProfile = () => {
    const nowTime: any = new Date()
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

  const updateProfile = (name: string, email: string) => {
    const nowTime: any = new Date()
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

  const forgotPassword = (email: string) => {
    dispatch(apiForgotPassword(email));
  }

  const resetPassword = (password: string, verificationЕoken: string) => {
    dispatch(apiResetPassword(password, verificationЕoken));
  }

  const handleOpenFeedDetails = (data: TDataWatchOrder, userOrder: boolean) => {
    setVisibleFeedDetails(true);
    userOrder ? dispatch((wsAuthWatchOrder(data))) : dispatch(wsWatchOrder(data));
  }

  return (
    <div className="App">
        <AppHeader/>
        <Preloader open = {openPreloader}/>
        <Switch location={background || location}>

          <ProtectedRoute path = '/register' authorize={false}>
            <Register handleRegister = {handleRegister}/>
          </ProtectedRoute>

          <ProtectedRoute path = '/login' authorize={false}>
            <Login handleLogin = {handleLogin}/>
          </ProtectedRoute>

          <ProtectedRoute path = '/forgot-password' authorize={false}>
            <ForgotPassword forgotPassword = {forgotPassword}/>
          </ProtectedRoute>

          <ProtectedRoute path = '/reset-password' authorize={false}>
            {openResetPassword || successResetPassword ?  <ResetPassword resetPassword = {resetPassword}/> : <Redirect to = '/forgot-password'/>}
          </ProtectedRoute>

          <ProtectedRoute path = '/profile/orders/:id' authorize = {true}>
              <FeedAuthId/>
          </ProtectedRoute>

          <ProtectedRoute path = '/profile/orders' authorize = {true}>
              <Orders onClick = {handleOpenFeedDetails} logoutProfile = {logoutProfile}/> 
          </ProtectedRoute>

          <ProtectedRoute path = '/profile' authorize={true}>
            <Profile updateProfile = {updateProfile} logoutProfile = {logoutProfile}/>
          </ProtectedRoute>

          <Route exact path = '/feed/:id'>
              <FeedId/> 
          </Route>

          <Route exact path = '/feed'>
              <Feed onClick = {handleOpenFeedDetails}/> 
          </Route>

          <Route exact path = '/ingredients/:id'>
              <IngredientDetails/> 
          </Route>

          <Route exact path = '/'>
            <main className={styles.main_content} style = {{opacity}}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onClick = {handleOpenIngredientDetails}/>
                <BurgerConstructor isOpen = {visibleOrderDetails} onClose = {handleCloseModal} onClick = {handleOpenOrderDetails}/>
              </DndProvider>
            </main>
          </Route>

          <Route path = '/*'>
            <NotFound/>
          </Route>

        </Switch>
        {background && <Route path= '/ingredients/:id'>
          <Popup isOpen = {visibleIngredientDetails} onClose = {handleCloseModal} />
        </Route>}

        {background && <Route path= '/feed/:id'>
          <Popup isOpen = {visibleFeedDetails} onClose = {handleCloseModal}/>
        </Route>}

        {background && <ProtectedRoute path= '/profile/orders/:id' authorize = {true}>
          <Popup isOpen = {visibleFeedDetails} onClose = {handleCloseModal}/>
        </ProtectedRoute>}
        
    </div>
  );
}

export default App;