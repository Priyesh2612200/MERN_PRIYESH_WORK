import postAPIReducer from './postAPIreducer';
import getAPIReducer from './getAPIreducer';
import deleteAPIReducer from './deleteAPIreducer';
import { combineReducers } from 'redux';
import updateAPIReducer from './updateAPIreducer';
import userPostAPIReducer from './userPostAPIReducer';
import usergetAPIReducer from './userGetAPIReducer';
import getAllAPIReducer from './allUserAPIReducer'
import updateUSERAPIReducer from './userUpdateAPIReducer';
import deleteUSERAPIReducer from './userDeleteAPIReducer';

const rootReducer=combineReducers({
    postApiData:postAPIReducer,
    getApiData:getAPIReducer,
    deleteApiData:deleteAPIReducer,
    updateApiDaata: updateAPIReducer,
    userpostApiData:userPostAPIReducer,
    usergetapidata:usergetAPIReducer,
    alluserapidata:getAllAPIReducer,
    alluserupdatedata:updateUSERAPIReducer,
    userdeletedata:deleteUSERAPIReducer
})
export default rootReducer;