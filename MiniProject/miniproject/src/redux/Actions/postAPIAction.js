import { postAPI } from "../actionsTypes";

import Swal from "sweetalert2";
import { productAPI } from "../../apiLayur/apiHandler/controllers";

export const FetchApiData = (data) => {
  Swal.fire("Data Save Successful!");

  return async (dispatch) => {
    let res;
    dispatch({ type: postAPI.POST_API_REQUEST });
    try {
      res = await productAPI.insertProduct(data);
    } catch (error) {}

    if (res.ResponseStatus === 200) {
      dispatch({
        type: postAPI.POST_API_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    }

    if (res.ResponseStatus === 400) {
      const { error } = res.data;

      dispatch({
        type: postAPI.POST_API_FAILURE,
        payload: { error },
      });
    }
  };
};
