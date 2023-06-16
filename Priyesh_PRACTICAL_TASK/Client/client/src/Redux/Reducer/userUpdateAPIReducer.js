import { userUpdateAPI } from "../../actionTypes";

const initialState = {
  UPDATE_DATA: [],
  loading: false,
};


const updateUSERAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case userUpdateAPI.USER_UPDATE_API_SUCCESS:
      return {
        ...state,
        UPDATE_DATA: actions.payload,
        loading: false,
      };
      case userUpdateAPI.USER_UPDATE_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case userUpdateAPI.USER_UPDATE_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default updateUSERAPIReducer;
