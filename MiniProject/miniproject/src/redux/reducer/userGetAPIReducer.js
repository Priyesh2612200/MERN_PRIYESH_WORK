import { userGetAPI } from "../actionsTypes";

const initialState = {
  FETCH_DATA: [],
  loading: false,
};


const usergetAPIReducer = (state = initialState, actions) => {
    console.log("State____,",state);
    console.log("ACtion,",actions);
  switch (actions.type) {
    
    case userGetAPI.GET_USER_API_SUCCESS:
        
      return {
        ...state,
        FETCH_DATA: actions.payload,
        loading: false,
      };
      case userGetAPI.GET_USER_API_REQUEST:
 

        return {
          ...state,
          loading: true,
        };
        case userGetAPI.GET_USER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default usergetAPIReducer;
