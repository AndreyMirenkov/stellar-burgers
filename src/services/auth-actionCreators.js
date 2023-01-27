import { registerUser,
    loginUser, 
    logoutUser, 
    getProfile, 
    updateProfile, 
    updateToken, 
    forgotPassword, 
    resetPassword } from "../utils/authApi";

import { REGISTER_USER, 
    LOGIN_USER,
    LOGOUT_USER, 
    UPDATE_TOKEN, 
    GET_DATA_ABOUT_PROFILE, 
    UPDATE_PROFILE_DATA,
    FORGOT_PASSWORD,
    RESET_PASSWORD, 
    LINK_TO_CLICK_PAGE, 
    RESET_LINK_TO_CLICK_PAGE,
    CLICK_ON_INGREDIENT,
    RESET_CLICK_ON_INGREDIENT,
    RESET_SUCCESS_INPUT_NEW_PASSWORD} from "./auth-actions";

    import { setCookie } from '../utils/cookie';

export const actionRegisterUser = (name, email, accessToken, refreshToken) => {
    return {
        type: REGISTER_USER,
        name,
        email,
        accessToken,
        refreshToken
    }
}

export const actionLoginUser = (name, email,accessToken, refreshToken) => {
    return {
        type: LOGIN_USER,
        name,
        email,
        accessToken,
        refreshToken
    }
}

export const actionLogoutUser = () => {
    return{
        type: LOGOUT_USER
    }
}

export const actionUpdateToken = (accessToken, refreshToken) => {
    return {
        type: UPDATE_TOKEN,
        accessToken,
        refreshToken
    }
}

export const actionGetProfileData = (name, email) => {
    return {
        type: GET_DATA_ABOUT_PROFILE,
        name,
        email

    }
}

export const actionUpdataProfile = (name, email) => {
    return {
        type: UPDATE_PROFILE_DATA,
        name,
        email
    }
}

export const actionForgotPassword = () => {
    return {
        type: FORGOT_PASSWORD,
    }
}

export const actionResetPassword = () => {
    return {
        type: RESET_PASSWORD,
    }
}

export const actionLinkClickPage = (link) => {
    return {
        type: LINK_TO_CLICK_PAGE,
        link,
    }
}

export const actionResetLinkClickPage = () => {
    return {
        type: RESET_LINK_TO_CLICK_PAGE,
    }
}

export const actionClickOnIngredient = () => {
  return {
    type: CLICK_ON_INGREDIENT,
  }
}

export const actionResetClickOnIngredient = () => {
  return {
    type: RESET_CLICK_ON_INGREDIENT,
  }
}

export const actionResetSuccessNewPassword = () => {
  return {
    type: RESET_SUCCESS_INPUT_NEW_PASSWORD
  }
}

export const apiRegisterUser = (name, email, password) => {
    return function(dispatch){
        registerUser({name, email, password})
        .then(res => {
          if (res && res.success) {
            const accessToken = res.accessToken;
            const token = accessToken.split(' ');
            setCookie('token', token[1]);
            localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
            dispatch(actionRegisterUser(res.user.name, res.user.email, token[1], res.refreshToken));
          } else {
            alert('Возникла ошибка при регистрации.');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiLoginUser = (email, password) => {
    return function(dispatch){
        loginUser({email, password})
        .then(res => {
          if (res && res.success) {
            const accessToken = res.accessToken;
            const token = accessToken.split(' ');
            setCookie('token', token[1]);
            localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
            dispatch(actionLoginUser(res.user.name, res.user.email, token[1], res.refreshToken));
          } else {
            alert('Неправильный логин или пароль.');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiLogoutUser = (token) => {
    return function(dispatch){
        logoutUser(token)
        .then(res => {
          if (res && res.success) {
            dispatch(actionLogoutUser());
          } else {
            alert('Возникла ошибка. Попробуйте ещё раз');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiUpdateToken = (token) => {
    return function(dispatch){
        updateToken(token)
        .then(res => {
          if (res && res.success) {
            const accessToken = res.accessToken;
            const token = accessToken.split(' ');
            setCookie('token', token[1]);
            localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
            dispatch(actionUpdateToken(token[1], res.refreshToken));
          } else {
            alert('Возникла ошибка при проверке пользователя.');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiGetProfile = () => {
    return function(dispatch){
        getProfile()
        .then(res => {
          if (res && res.success) {
            dispatch(actionGetProfileData(res.user.name, res.user.email));
          } else {
            alert('Возникла ошибка при получении данных профиля.');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiUpdateProfile = (name, email) => {
    return function(dispatch){
        updateProfile({name, email})
        .then(res => {
          if (res && res.success) {
            dispatch(actionUpdataProfile(res.user.name, res.user.email));
          } else {
            alert('Возникла ошибка при обновлении данных профиля. Попрубуйте ещё раз');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiForgotPassword = (email) => {
    return function(dispatch){
        forgotPassword(email)
        .then(res => {
          if (res && res.success) {
            dispatch(actionForgotPassword());
          } else {
            alert('Возникла ошибка при восстановлении пароля. Попробуйте ещё раз');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}

export const apiResetPassword = (password, token) => {
    return function(dispatch){
        resetPassword({password, token})
        .then(res => {
          if (res && res.success) {
            dispatch(actionResetPassword());
          } else {
            alert('Возникла ошибка при восстановлении пароля. Попробуйте ещё раз');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}
