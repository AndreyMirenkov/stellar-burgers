import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware} from 'redux';
import {rootReducer} from './reducers';



export const configurationStore = (initialState) => {
 
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
               thunkMiddleware.withExtraArgument(),
            )
        )
    );

    return store;
}