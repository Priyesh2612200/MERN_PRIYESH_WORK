import { CommanResponse } from "../../../apiUtils/models/commonResponse";
// import {  } from "../../services/POST/getService";
import { alluserServiceget } from "../../services/USER/alluserService";
export const alluserController = {
  getAllUser,
};
async function getAllUser(object) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await alluserServiceget.getAllUserdata(object);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From get ALL User controller::>", error);
  }
}
