import { userPostAPI } from "../actionsTypes";

const initialState = {
  POST_DATA: [],
  loading: false,
};


const userPostAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case userPostAPI.POST_USER_API_REQUEST:
      return {
        ...state,
        POST_DATA: actions.payload,
        loading: false,
      };
      case userPostAPI.POST_USER_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case userPostAPI.POST_USER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default userPostAPIReducer;
