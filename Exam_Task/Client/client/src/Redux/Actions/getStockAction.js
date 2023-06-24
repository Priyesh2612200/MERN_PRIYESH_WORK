import { getStockAPI } from "../actionTypes";
import { getAllStock } from "../../ApiEndPoints.js";

export const getAllStockApiData = () => {
  return async (dispatch) => {
    let res;
    dispatch({ type: getStockAPI.GET_STOCK_API_REQUEST });

    try {
         res = await getAllStock();

      if (res.ResponseStatus === 201) {
        const { data } = res.Result;
        dispatch({
          type: getStockAPI.GET_STOCK_API_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: getStockAPI.GET_STOCK_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
