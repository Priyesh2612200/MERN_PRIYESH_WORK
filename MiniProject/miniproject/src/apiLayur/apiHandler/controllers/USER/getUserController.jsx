import { CommanResponse } from "../../../apiUtils/models/commonResponse";

import { usergetServiceget } from "../../services/USER/usergetService";

export const usergetController = {
    getUser,
};
async function getUser(object) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await usergetServiceget.getProduct(object);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From user get controller::>", error);
  }
}
