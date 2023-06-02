import { userAllGetAPI } from "../actionsTypes";
 import { allusergetAPI } from "../../apiLayur/apiHandler/controllers";
export const getAllApiData = (data) => {
  return async (dispatch) => {
    let res;
    dispatch({ type: userAllGetAPI.GET_ALLUSER_API_REQUEST });

    try {
      res = await allusergetAPI.getAllUser();

      if (res.ResponseStatus === 201) {
        const { data } = res.Result;
        dispatch({
          type: userAllGetAPI.GET_ALLUSER_API_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: userAllGetAPI.GET_ALLUSER_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
