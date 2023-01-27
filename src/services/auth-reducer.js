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


export const initialState = {
    loggedIn: false,
    name: null,
    email: null,
    token: {
        accessToken: null,
        refreshToken: null,
        time: null
    },
    linkToPage: {
        transition: false,
        link: null
      },
    linkForPopup: {
        clickOnIngredient: false
      },
    openResetPassword: {
      inputEmailOnForgotPage: false
    },
    resetPassword: false,
}

export const authReducer = (state = initialState, action) => {
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
            time: new Date()
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
            time: new Date()
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
          name: null,
          email: null,
          token: {
            accessToken: null,
            refreshToken: null,
            time: null
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
            time: new Date()
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
      case LINK_TO_CLICK_PAGE: {
        return {
          ...state,
            linkToPage: {
              transition: true,
              link: action.link
            },
        }
      }
      case RESET_LINK_TO_CLICK_PAGE: {
        return {
          ...state,
            linkToPage: {
              transition: false,
              link: null,
            },
        }
      }
      case CLICK_ON_INGREDIENT: {
        return {
          ...state,
          linkForPopup: {
            clickOnIngredient: true,
          },
        }
      }
      case RESET_CLICK_ON_INGREDIENT: {
        return {
          ...state,
          linkForPopup: {
            clickOnIngredient: false,
          },
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