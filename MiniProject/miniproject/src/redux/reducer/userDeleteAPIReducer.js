import { userdeleteAPI } from "../actionsTypes";

const initialState = {
  DELETE_DATA: [],
  loading: false,
};


const deleteUSERAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case userdeleteAPI.DELETE_USER_API_SUCCESS:
        
      return {
        ...state,
        DELETE_DATA: actions.payload,
        loading: false,
      };
      case userdeleteAPI.DELETE_USER_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case userdeleteAPI.DELETE_USER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default deleteUSERAPIReducer;
