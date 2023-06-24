import { combineReducers } from 'redux';
import postStockAPIReducer from './postStockreducer';
import getAllStockAPIReducer from './getStockReducer';
import postOrderAPIReducer from './postorderReducer';
const rootReducer=combineReducers({
    postApiData:postStockAPIReducer,
    getApiData:getAllStockAPIReducer,
    postOrderData:postOrderAPIReducer
})
export default rootReducer;