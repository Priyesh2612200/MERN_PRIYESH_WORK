import { CommanResponse } from "../../../apiUtils/models/commonResponse";

import { productServicedelete } from "../../services/POST/deleteService";
export const productdeleteController = {
  deleteProduct,
};
async function deleteProduct(idvalue) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await productServicedelete.deleteProduct(idvalue);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From delete controller::>", error);
  }
}
