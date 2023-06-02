import { userAllGetAPI } from "../actionsTypes";

const initialState = {
  FETCHALL_DATA: [],
  loading: false,
};


const getAllAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case userAllGetAPI.GET_ALLUSER_API_SUCCESS:
        
      return {
        ...state,
        FETCHALL_DATA: actions.payload,
        loading: false,
      };
      case userAllGetAPI.GET_ALLUSER_API_REQUEST:

        return {
          ...state,
          loading: true,
        };
        case userAllGetAPI.GET_ALLUSER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default getAllAPIReducer;
