import { formPostAPI } from "../actionTypes";
//import { productAPI } from "../../apiLayur/apiHandler/controllers";
import { postAPIData } from "../../frontendApi";

export const PostData = (data) => {
 
    return async (dispatch) => {
      let res;
      dispatch({ type: formPostAPI.POST_FORM_API_REQUEST });
      try {
        res = await postAPIData(data);
        console.log("RES___",res)
      } catch (error) {}
  
      if (res.ResponseStatus === 200) {
        dispatch({
          type: formPostAPI.POST_FORM_API_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      }
  
      if (res.ResponseStatus === 400) {
        const { error } = res.data;
  
        dispatch({
          type: formPostAPI.POST_FORM_API_FAILURE,
          payload: { error },
        });
      }
    };
  };