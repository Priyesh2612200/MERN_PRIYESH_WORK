// import { userPostAPI } from "../../actionTypes";

// import Swal from "sweetalert2";
// import { userpostAPIData } from "../../api_EndPoint";

// export const PostApiData = (data) => {
//   Swal.fire("User Data Save Successful!");

//   return async (dispatch) => {
//     let res;
//     dispatch({ type: userPostAPI.USER_POST_API_REQUEST });
//     try {
//       res = await userpostAPIData(data);
//     } catch (error) {}

//     if (res.status === 200) {
//       dispatch({
//         type: userPostAPI.USER_POST_API_SUCCESS,
//         payload: res.data,
//       });
//       console.log(res.data);
//     }

//     if (res.status === 400) {
//       const { error } = res.data;

//       dispatch({
//         type: userPostAPI.USER_POST_API_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };
import { userPostAPI } from "../../actionTypes";
import Swal from "sweetalert2";
import { userpostAPIData } from "../../api_EndPoint";

export const PostApiData = (data) => {
  Swal.fire("User Data Save Successful!");

  return async (dispatch) => {
    dispatch({ type: userPostAPI.USER_POST_API_REQUEST });

    try {
      const res = await userpostAPIData(data);

      if (res.status === 200) {
        dispatch({
          type: userPostAPI.USER_POST_API_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      } else if (res.status === 400) {
        const { error } = res.data;
        dispatch({
          type: userPostAPI.USER_POST_API_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
