import postAPIReducer from "./formReducer";
import { combineReducers } from 'redux';
const rootReducer=combineReducers({
    postApiData:postAPIReducer,
   
})
export default rootReducer;