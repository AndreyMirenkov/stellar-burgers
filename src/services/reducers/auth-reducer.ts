import { REGISTER_USER, 
  LOGIN_USER,
  LOGOUT_USER, 
  UPDATE_TOKEN, 
  GET_DATA_ABOUT_PROFILE, 
  UPDATE_PROFILE_DATA,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESET_SUCCESS_INPUT_NEW_PASSWORD} from "../actions/auth-actions";

import { TAuthActions } from "../actions/auth-actionCreators";

type TAuthState = {
  loggedIn: boolean,
    name: string,
    email: string,
    token: {
        accessToken: string| null,
        refreshToken: string | null,
    },
    openResetPassword: {
      inputEmailOnForgotPage: boolean
    },
    resetPassword: boolean,
} 

export const initialState: TAuthState = {
    loggedIn: false,
    name: '',
    email: '',
    token: {
        accessToken: null,
        refreshToken: null,
    },
    openResetPassword: {
      inputEmailOnForgotPage: false
    },
    resetPassword: false,
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch(action.type){
      case REGISTER_USER: {
        return {
          ...state,
          loggedIn: true,
          name: action.name,
          email: action.email,
          token: {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          }
        };
      }
      case LOGIN_USER: {
        return {
          ...state,
          loggedIn: true,
          name: action.name,
          email: action.email,
          token: {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          }
        };
      }
      case UPDATE_PROFILE_DATA: {
        return {
          ...state,
          name: action.name,
          email: action.email,
        }
      }
      case LOGOUT_USER: {
        return {
          ...state,
          loggedIn: false,
          name: '',
          email: '',
          token: {
            accessToken: null,
            refreshToken: null,
          },
        }
      }
      case GET_DATA_ABOUT_PROFILE: {
        return {
          ...state,
          name: action.name,
          email: action.email
        }
      }
      case UPDATE_TOKEN: {
        return {
          ...state,
          loggedIn: true,
          token: {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          }
        }
      }
      case FORGOT_PASSWORD: {
        return {
          ...state,
          openResetPassword: {
            inputEmailOnForgotPage: true
          }
        }
      }
      case RESET_PASSWORD: {
        return {
          ...state,
          openResetPassword: {
            inputEmailOnForgotPage: false
          },
          resetPassword: true,
        }
      }
      case RESET_SUCCESS_INPUT_NEW_PASSWORD: {
        return {
          ...state,
          resetPassword: false
        }
      }
      default: {
        return state;
      }
    }
}
