import { userPostAPI } from "../actionsTypes";

import Swal from "sweetalert2";
import { userpostAPI } from "../../apiLayur/apiHandler/controllers";

export const PostApiData = (data) => {
  Swal.fire("User Data Save Successful!");

  return async (dispatch) => {
    let res;
    dispatch({ type: userPostAPI.POST_USER_API_REQUEST });
    try {
      res = await userpostAPI.insertUser(data);
    } catch (error) {}

    if (res.ResponseStatus === 200) {
      dispatch({
        type: userPostAPI.POST_USER_API_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    }

    if (res.ResponseStatus === 400) {
      const { error } = res.data;

      dispatch({
        type: userPostAPI.POST_USER_API_FAILURE,
        payload: { error },
      });
    }
  };
};
