import { postAPI } from "../actionsTypes";

const initialState = {
  FETCH_DATA: [],
  loading: false,
};


const postAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case postAPI.POST_API_SUCCESS:
      return {
        ...state,
        FETCH_DATA: actions.payload,
        loading: false,
      };
      case postAPI.POST_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case postAPI.POST_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default postAPIReducer;
