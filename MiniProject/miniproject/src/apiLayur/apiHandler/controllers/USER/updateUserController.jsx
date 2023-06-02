import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import {userServiceupdate} from "../../services/USER/userUpdateService"
export const userupdateController = {
  updateUser,
};
async function updateUser(object, id) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await userServiceupdate.updateUser(id, object);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From  user update controller::>", error);
  }
}
