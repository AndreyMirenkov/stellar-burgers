import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware} from 'redux';
import { mainReducer } from "./reducers/combine-reducers";


export const configurationStore = (initialState) => {
 
    const store = createStore(
        mainReducer,
        composeWithDevTools(
            applyMiddleware(
               thunkMiddleware.withExtraArgument(),
            )
        )
    );

    return store;
}