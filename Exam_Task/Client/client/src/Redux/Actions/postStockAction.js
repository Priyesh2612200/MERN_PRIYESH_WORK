import { postStockAPI } from "../actionTypes";
import { InsertStockData } from "../../ApiEndPoints.js";

export const postStockData = (data) => {
    return async (dispatch) => {
      dispatch({ type: postStockAPI.POST_STOCK_API_REQUEST });
      
      try {
        const res = await InsertStockData(data);
        
        if (res.status === 200) {
          dispatch({
            type: postStockAPI.POST_STOCK_API_SUCCESS,
            payload: res.data,
          });
          console.log(res.data);
        } else {
          const { error } = res.data;
          dispatch({
            type: postStockAPI.POST_STOCK_API_FAILURE,
            payload: error,
          });
          console.log(error);
        }
      } catch (error) {
        dispatch({
          type: postStockAPI.POST_STOCK_API_FAILURE,
          payload: error.message,
        });
        console.log(error.message);
      }
    };
  };
  
  
  
  
  
  
  
  