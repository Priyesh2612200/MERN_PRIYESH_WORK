import { userdeleteAPI } from "../actionsTypes";
// import { productdeleteAPI } from "../../apiLayur/apiHandler/controllers";
import { userDELETEAPI } from "../../apiLayur/apiHandler/controllers";
import Swal from "sweetalert2";

export const deleteUSERApiData = (idvalue) => {
  Swal.fire("Delete Data successful!");

  return async (dispatch) => {
    let res;
    dispatch({ type: userdeleteAPI.DELETE_USER_API_REQUEST });

    try {
      res = await userDELETEAPI.deleteUser(idvalue);

      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: userdeleteAPI.DELETE_USER_API_SUCCESS,
          payload: data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userdeleteAPI.DELETE_USER_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      dispatch({
        type: userdeleteAPI.DELETE_USER_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
