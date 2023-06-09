import { userUpdateAPI } from "../../actionTypes";

import Swal from "sweetalert2";
import { updateAPIDATA } from "../../api_EndPoint";

export const updateuserAPIData = (id, data) => {
  Swal.fire("Good job!", "Data Updated Successfully!", "success");

  return async (dispatch) => {
    let res;
    dispatch({ type: userUpdateAPI.USER_UPDATE_API_REQUEST });

    try {
      res = await updateAPIDATA(id, data);

      if (res.ResponseStatus === 200) {
        const data = res.data;
        dispatch({
          type: userUpdateAPI.USER_UPDATE_API_SUCCESS,
          payload: data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userUpdateAPI.USER_UPDATE_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      dispatch({
        type: userUpdateAPI.USER_UPDATE_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
