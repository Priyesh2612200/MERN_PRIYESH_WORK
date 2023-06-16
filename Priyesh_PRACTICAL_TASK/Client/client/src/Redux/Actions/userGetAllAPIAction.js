import { userAllDataAPI } from "../../actionTypes";
import { getAllUser } from "../../api_EndPoint";

export const getAllUserApiData = (data) => {
  return async (dispatch) => {
    let res;
    dispatch({ type: userAllDataAPI.USER_ALLGET_API_REQUEST });

    try {
         res = await userpostAPIData(data);

      if (res.ResponseStatus === 201) {
        const { data } = res.Result;
        dispatch({
          type: userAllDataAPI.USER_ALLGET_API_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: userAllDataAPI.USER_ALLGET_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
