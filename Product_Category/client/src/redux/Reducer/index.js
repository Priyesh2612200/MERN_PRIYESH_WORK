import productPostAPIReducer from './productPostReducer';
import { combineReducers } from 'redux';

const rootReducer=combineReducers({
    postApiData:productPostAPIReducer,
})
export default rootReducer;