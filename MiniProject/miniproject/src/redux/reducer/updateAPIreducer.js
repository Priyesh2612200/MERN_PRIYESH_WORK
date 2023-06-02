import { updateAPI } from "../actionsTypes";

const initialState = {
  FETCH_DATA: [],
  loading: false,
};


const updateAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case updateAPI.UPDATE_API_SUCCESS:
      return {
        ...state,
        FETCH_DATA: actions.payload,
        loading: false,
      };
      case updateAPI.UPDATE_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case updateAPI.UPDATE_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default updateAPIReducer;
