import {formPostAPI} from '../actionTypes'

const initialState = {
  FETCH_DATA: [],
  loading: false,
};


const postAPIReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case formPostAPI.POST_FORM_API_SUCCESS:
      return {
        ...state,
        FETCH_DATA: actions.payload,
        loading: false,
      };
      case formPostAPI.POST_FORM_API_REQUEST:


        return {
          ...state,
          loading: true,
        };
        case formPostAPI.POST_FORM_API_FAILURE:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};
export default postAPIReducer;
