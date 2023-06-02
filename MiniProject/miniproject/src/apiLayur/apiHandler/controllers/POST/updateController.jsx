import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import { productServiceupdate } from "../../services/POST/updateService";
export const productupdateController = {
  updateProduct,
};
async function updateProduct(object, id) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await productServiceupdate.updateProduct(id, object);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From update controller::>", error);
  }
}
