
import { productCreate } from "../actionsTypes";

const initialState = {
  POST_DATA: [],
  loading: false,
};


const productPostAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case productCreate.POST_PRODUCT_API_SUCCESS:
      return {
        ...state,
        POST_DATA: actions.payload,
        loading: false,
      };
      case productCreate.POST_PRODUCT_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case productCreate.POST_PRODUCT_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default productPostAPIReducer;
