import { userupdateAPI } from "../actionsTypes";

const initialState = {
  UPDATE_DATA: [],
  loading: false,
};


const updateUSERAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case userupdateAPI.UPDATE_USER_API_SUCCESS:
      return {
        ...state,
        UPDATE_DATA: actions.payload,
        loading: false,
      };
      case userupdateAPI.UPDATE_USER_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case userupdateAPI.UPDATE_USER_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default updateUSERAPIReducer;
