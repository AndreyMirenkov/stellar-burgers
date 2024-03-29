import thunkMiddleware from "redux-thunk";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware} from 'redux';
import { mainReducer } from "./reducers/combine-reducers";
import { socketMiddleware } from "./middleware/socketMiddleware";


export const configurationStore = () => {
 
    const store = createStore(
        mainReducer,
        composeWithDevTools(
            applyMiddleware(
               thunkMiddleware,
               socketMiddleware(),
            )
        )
    );

    return store;
}