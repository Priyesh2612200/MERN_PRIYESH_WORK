import { postOrderAPI } from "../actionTypes";

const initialState = {
  POST_DATA: [],
  loading: false,
};


const postOrderAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case postOrderAPI.POST_ORDER_API_SUCCESS:
      return {
        ...state,
        POST_DATA: actions.payload,
        loading: false,
      };
      case postOrderAPI.POST_ORDER_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case postOrderAPI.POST_ORDER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default postOrderAPIReducer;
