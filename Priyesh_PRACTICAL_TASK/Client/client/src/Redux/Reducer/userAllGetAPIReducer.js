import { userAllDataAPI } from "../../actionTypes";

const initialState = {
  FETCHALL_DATA: [],
  loading: false,
};


const getAllUserAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case userAllDataAPI.USER_ALLGET_API_SUCCESS:
        
      return {
        ...state,
        FETCHALL_DATA: actions.payload,
        loading: false,
      };
      case userAllDataAPI.USER_ALLGET_API_REQUEST:

        return {
          ...state,
          loading: true,
        };
        case userAllDataAPI.USER_ALLGET_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default getAllUserAPIReducer;
