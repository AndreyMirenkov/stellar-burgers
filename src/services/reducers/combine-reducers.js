import { combineReducers } from 'redux';
import {rootReducer} from './reducers';
import { authReducer } from './auth-reducer';
import { initialState as rootState} from './reducers';
import { initialState as authState } from './auth-reducer';

export const InitialState = {
    rootState, 
    authState
}

export const mainReducer = combineReducers({
    rootReducer,
    authReducer
})
