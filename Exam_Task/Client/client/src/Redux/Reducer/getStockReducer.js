import { getStockAPI } from "../actionTypes";

const initialState = {
  FETCHALL_DATA: [],
  loading: false,
};


const getAllStockAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    
    case getStockAPI.GET_STOCK_API_SUCCESS:
        
      return {
        ...state,
        FETCHALL_DATA: actions.payload,
        loading: false,
      };
      case getStockAPI.GET_STOCK_API_REQUEST:

        return {
          ...state,
          loading: true,
        };
        case getStockAPI.GET_STOCK_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default getAllStockAPIReducer;
