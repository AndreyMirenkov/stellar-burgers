import { AppDispatch } from "../../utils/types";

import { registerUser,
    loginUser, 
    logoutUser, 
    getProfile, 
    updateProfile, 
    updateToken, 
    forgotPassword, 
    resetPassword } from "../../utils/Api/authApi";

import { REGISTER_USER, 
    LOGIN_USER,
    LOGOUT_USER, 
    UPDATE_TOKEN, 
    GET_DATA_ABOUT_PROFILE, 
    UPDATE_PROFILE_DATA,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    RESET_SUCCESS_INPUT_NEW_PASSWORD} from "./auth-actions";

    import { setCookie } from '../../utils/cookie/cookie';

export interface IActionRegisterUser {
  readonly type: typeof REGISTER_USER;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IActionLoginUser {
  readonly type: typeof LOGIN_USER;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IActionLogoutUser { 
  readonly type: typeof LOGOUT_USER;
}

export interface IActionUpdateToken {
  readonly type: typeof UPDATE_TOKEN;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IActionGetProfileData {
  readonly type: typeof GET_DATA_ABOUT_PROFILE;
  readonly name: string;
  readonly email: string;
}

export interface IActionUpdataProfile {
  readonly type: typeof UPDATE_PROFILE_DATA;
  readonly name: string;
  readonly email: string;
}

export interface IActionForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
}

export interface IActionResetPassword {
  readonly type: typeof RESET_PASSWORD;
}

export interface IActionResetSuccessNewPassword {
  readonly type: typeof RESET_SUCCESS_INPUT_NEW_PASSWORD;
}

export type TAuthActions = | IActionRegisterUser 
| IActionLoginUser 
| IActionLogoutUser 
| IActionUpdateToken 
| IActionGetProfileData 
| IActionUpdataProfile 
| IActionForgotPassword 
| IActionResetPassword 
| IActionResetSuccessNewPassword;


export const actionRegisterUser = (name: string, email: string, accessToken: string, refreshToken: string): IActionRegisterUser => {
    return {
        type: REGISTER_USER,
        name,
        email,
        accessToken,
        refreshToken
    }
}

export const actionLoginUser = (name: string, email: string, accessToken: string, refreshToken: string): IActionLoginUser => {
    return {
        type: LOGIN_USER,
        name,
        email,
        accessToken,
        refreshToken
    }
}

export const actionLogoutUser = (): IActionLogoutUser => {
    return{
        type: LOGOUT_USER
    }
}

export const actionUpdateToken = (accessToken: string, refreshToken: string): IActionUpdateToken => {
    return {
        type: UPDATE_TOKEN,
        accessToken,
        refreshToken
    }
}

export const actionGetProfileData = (name: string, email: string): IActionGetProfileData => {
    return {
        type: GET_DATA_ABOUT_PROFILE,
        name,
        email

    }
}

export const actionUpdataProfile = (name: string, email: string): IActionUpdataProfile  => {
    return {
        type: UPDATE_PROFILE_DATA,
        name,
        email
    }
}

export const actionForgotPassword = (): IActionForgotPassword => {
    return {
        type: FORGOT_PASSWORD,
    }
}

export const actionResetPassword = (): IActionResetPassword => {
    return {
        type: RESET_PASSWORD,
    }
}

export const actionResetSuccessNewPassword = (): IActionResetSuccessNewPassword => {
  return {
    type: RESET_SUCCESS_INPUT_NEW_PASSWORD
  }
}

export const apiRegisterUser = (name: string, email: string, password: string) => {
    return function(dispatch: AppDispatch){
        registerUser({name, email, password})
        .then((res: any) => {
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

export const apiLoginUser = (email: string, password: string) => {
    return function(dispatch: AppDispatch){
        loginUser({email, password})
        .then((res: any) => {
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

export const apiLogoutUser = (token: string) => {
    return function(dispatch: AppDispatch){
        logoutUser({token})
        .then((res: any) => {
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

export const apiUpdateToken = (token: string) => {
    return function(dispatch: AppDispatch){
        updateToken({token})
        .then((res: any) => {
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
    return function(dispatch: AppDispatch){
        getProfile()
        .then((res: any) => {
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

export const apiUpdateProfile = (name: string, email: string) => {
    return function(dispatch: AppDispatch){
        updateProfile({name, email})
        .then((res: any) => {
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

export const apiForgotPassword = (email: string) => {
    return function(dispatch: AppDispatch){
        forgotPassword({email})
        .then((res: any) => {
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

export const apiResetPassword = (password: string, token: string) => {
    return function(dispatch: AppDispatch){
        resetPassword({password, token})
        .then((res: any) => {
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
