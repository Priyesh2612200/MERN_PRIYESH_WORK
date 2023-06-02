
import { userGetAPI } from "../actionsTypes";
import { usergetAPI } from "../../apiLayur/apiHandler/controllers";

export const UserGETAPIDATA = () => {
  console.log("USER GET API DATA");
  return async (dispatch) => {
    dispatch({ type: userGetAPI.GET_USER_API_REQUEST });

    try {
   
      const res = await usergetAPI.getUser();
      console.log("RESPONSE USER",res);

      if (res.ResponseStatus === 201) {

        const { data } = res.Result;
        console.log("use PAYLOAD",data);
        dispatch({
          type: userGetAPI.GET_USER_API_SUCCESS,
          payload: data,
     
     
        });
        
      
      }
    } catch (error) {
      dispatch({
        type: userGetAPI.GET_USER_API_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
