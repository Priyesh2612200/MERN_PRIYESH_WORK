import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import {userServicedelete} from "../../services/USER/userDeleteService"
export const userdeleteController = {
  deleteUser,
};
async function deleteUser(idvalue) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await userServicedelete.deleteUser(idvalue);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From user delete controller::>", error);
  }
}
