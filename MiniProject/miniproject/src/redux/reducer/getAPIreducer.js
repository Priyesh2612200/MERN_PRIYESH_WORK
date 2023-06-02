import { getAPI } from "../actionsTypes";

const initialState = {
  FETCH_DATA: [],
  loading: false,
};


const getAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case getAPI.GET_API_SUCCESS:
        
      return {
        ...state,
        FETCH_DATA: actions.payload,
        loading: false,
      };
      case getAPI.GET_API_REQUEST:
 

        return {
          ...state,
          loading: true,
        };
        case getAPI.GET_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default getAPIReducer;
