import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware} from 'redux';
//import {rootReducer} from './reducers';
import { mainReducer } from "./combine-reducers";



export const configurationStore = (initialState) => {
 
    const store = createStore(
        mainReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
               thunkMiddleware.withExtraArgument(),
            )
        )
    );

    return store;
}