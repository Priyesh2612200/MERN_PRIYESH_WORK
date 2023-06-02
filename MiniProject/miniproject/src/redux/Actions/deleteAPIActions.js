import { deleteAPI } from "../actionsTypes";
import { productdeleteAPI } from "../../apiLayur/apiHandler/controllers";
import Swal from "sweetalert2";

export const deleteApiData = (idvalue) => {
  Swal.fire("Delete Data successful!");

  return async (dispatch) => {
    let res;
    dispatch({ type: deleteAPI.DELETE_API_REQUEST });

    try {
      res = await productdeleteAPI.deleteProduct(idvalue);

      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: deleteAPI.DELETE_API_SUCCESS,
          payload: data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: deleteAPI.DELETE_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      dispatch({
        type: deleteAPI.DELETE_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
