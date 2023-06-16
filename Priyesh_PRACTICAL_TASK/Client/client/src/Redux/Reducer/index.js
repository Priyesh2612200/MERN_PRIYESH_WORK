import userPostAPIReducer from "./userPostAPIReducer";
import { combineReducers } from 'redux';
import updateUSERAPIReducer from "./userUpdateAPIReducer"
import getAllUserAPIReducer from "./userAllGetAPIReducer";

const rootReducer=combineReducers({
  userpostApiData:userPostAPIReducer,
  userupdateApiData:updateUSERAPIReducer ,
  usergetallApiData:getAllUserAPIReducer
})
export default rootReducer;