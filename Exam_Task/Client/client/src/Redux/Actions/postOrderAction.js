import { postOrderAPI } from "../actionTypes";
import { InsertAPIOrder } from "../../ApiEndPoints.js";


export const postOrderData = (data) => {
    return async (dispatch) => {
      dispatch({ type: postOrderAPI.POST_ORDER_API_REQUEST });
      
      try {
        const res = await InsertAPIOrder(data);
        
        if (res.status === 200) {
          dispatch({
            type: postOrderAPI.POST_ORDER_API_SUCCESS,
            payload: res.data,
          });
         
        } else {
          const { error } = res.data;
          dispatch({
            type: postOrderAPI.POST_ORDER_API_FAILURE,
            payload: error,
          });
     
        }
      } catch (error) {
        dispatch({
          type: postOrderAPI.POST_ORDER_API_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
  
  
  
  
  
  
  