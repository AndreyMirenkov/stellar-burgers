import { combineReducers } from 'redux';
import {rootReducer} from './reducers';
import { authReducer } from './auth-reducer';
import { wsReducer } from './ws-reducer';
import { wsAuthReducer } from './ws-reducerAuth';
import { initialState as wsState } from './reducers';
import { initialState as wsAuthState } from './reducers';
import { initialState as rootState} from './reducers';
import { initialState as authState } from './auth-reducer';

export const InitialState = {
    rootState, 
    authState,
    wsState,
    wsAuthState,
}

export const mainReducer = combineReducers({
    rootReducer,
    authReducer,
    wsReducer,
    wsAuthReducer,
})
