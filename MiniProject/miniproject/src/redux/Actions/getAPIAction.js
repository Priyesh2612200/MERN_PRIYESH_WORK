import { getAPI } from "../actionsTypes";
import { productgetAPI } from "../../apiLayur/apiHandler/controllers";
export const getApiData = (data) => {
  return async (dispatch) => {
    let res;
    dispatch({ type: getAPI.GET_API_REQUEST });

    try {
      res = await productgetAPI.getProduct();

      if (res.ResponseStatus === 201) {
        const { data } = res.Result;
        dispatch({
          type: getAPI.GET_API_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: getAPI.GET_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
