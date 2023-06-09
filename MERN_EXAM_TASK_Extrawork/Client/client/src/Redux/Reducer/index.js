import userPostAPIReducer from "./userPostAPIReducer";
import { combineReducers } from 'redux';
import updateUSERAPIReducer from "./userUpdateAPIReducer"

const rootReducer=combineReducers({
  userpostApiData:userPostAPIReducer,
  userupdateApiData:updateUSERAPIReducer   
})
export default rootReducer;