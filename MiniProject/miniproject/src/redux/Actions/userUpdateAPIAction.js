import { userupdateAPI } from "../actionsTypes";
// import { productupdateAPI } from "../../apiLayur/apiHandler/controllers";
import {userUPDATEAPI} from "../../apiLayur/apiHandler/controllers"

import Swal from "sweetalert2";

export const updateuserAPIData = (id, data) => {
  Swal.fire("Good job!", "Data Updated Successfully!", "success");

  return async (dispatch) => {
    let res;
    dispatch({ type: userupdateAPI.UPDATE_USER_API_REQUEST });

    try {
      res = await userUPDATEAPI.updateUser(id, data);

      if (res.ResponseStatus === 200) {
        const data = res.data;
        dispatch({
          type: userupdateAPI.UPDATE_USER_API_SUCCESS,
          payload: data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userupdateAPI.UPDATE_USER_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      dispatch({
        type: userupdateAPI.UPDATE_USER_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
