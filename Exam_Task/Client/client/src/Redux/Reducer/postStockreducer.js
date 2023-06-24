import { postStockAPI } from "../actionTypes";

const initialState = {
  POST_DATA: [],
  loading: false,
};


const postStockAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case postStockAPI.POST_STOCK_API_SUCCESS:
      return {
        ...state,
        POST_DATA: actions.payload,
        loading: false,
      };
      case postStockAPI.POST_STOCK_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case postStockAPI.POST_STOCK_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default postStockAPIReducer;
