import {createStore,applyMiddleware} from "redux"
import  rootReducer  from "../Reducer/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"


// const middleware = []
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;

// createStore is used to create the Redux store, and applyMiddleware is used to apply middleware to the store.
//thunk middleware