import { productCreate } from "../actionsTypes";
import axios from 'axios'

import Swal from "sweetalert2";


export const productPostApiData = (formData) => {
    console.log("FORM DATA__",formData)

  Swal.fire("Product Save Successful!");

  return async (dispatch) => {
    let res;
 
    dispatch({ type: productCreate.POST_PRODUCT_API_REQUEST });
    try {
    
       res = await axios.post('http://localhost:5000/product',formData)
    } catch (error) {}

    if ( res.status === 200) {
        dispatch({
          type: productCreate.POST_PRODUCT_API_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      }
      
      if ( res.status === 400) {
        const { error } = res.data;
      
        dispatch({
          type: productCreate.POST_PRODUCT_API_FAILURE,
          payload: { error },
        });
      
    }
  };
};
