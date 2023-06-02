import { deleteAPI } from "../actionsTypes";

const initialState = {
  DELETE_DATA: [],
  loading: false,
};


const deleteAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case deleteAPI.DELETE_API_SUCCESS:
        
      return {
        ...state,
        DELETE_DATA: actions.payload,
        loading: false,
      };
      case deleteAPI.DELETE_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case deleteAPI.DELETE_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default deleteAPIReducer;
