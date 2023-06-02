import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import { productServiceget } from "../../services/POST/getService";
export const productgetController = {
  getProduct,
};
async function getProduct(object) {
  try {
    let responseOBJ = new CommanResponse();

    const response = await productServiceget.getProduct(object);

    if (response) {
      responseOBJ.Status = response?.status === 200 ? true : false;
      responseOBJ.Result = response?.data ? response?.data : undefined;
      responseOBJ.ResponseStatus = response.status;
    }

    return responseOBJ;
  } catch (error) {
    console.log("error From get controller::>", error);
  }
}
