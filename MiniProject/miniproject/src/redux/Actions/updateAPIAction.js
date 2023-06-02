import { updateAPI } from "../actionsTypes";
import { productupdateAPI } from "../../apiLayur/apiHandler/controllers";

import Swal from "sweetalert2";

export const updateAPIData = (id, data) => {
  Swal.fire("Good job!", "Data Updated Successfully!", "success");

  return async (dispatch) => {
    let res;
    dispatch({ type: updateAPI.UPDATE_API_REQUEST });

    try {
      res = await productupdateAPI.updateProduct(id, data);

      if (res.ResponseStatus === 200) {
        const data = res.data;
        dispatch({
          type: updateAPI.UPDATE_API_SUCCESS,
          payload: data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: updateAPI.UPDATE_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      dispatch({
        type: updateAPI.UPDATE_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
