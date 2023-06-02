import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import * as Yup from "yup";
import { productService } from "../../services/POST/PostService";
import { ResponseStatus } from "../../../../../src/apiLayur/apiUtils/interfacesAndTypes";
export const productController = {
  insertProduct,
};
async function insertProduct(object) {
  try {
    let responseOBJ = new CommanResponse();

    let productSchema = Yup.object({
      title: Yup.string().required(),

      description: Yup.string().required(),

      category: Yup.string().required(),
    });

    if (await productSchema.isValid(object)) {
      const response = await productService.createProduct(object);

      if (response) {
        responseOBJ.Status = response?.status === 200 ? true : false;
        responseOBJ.Result = response?.data ? response?.data : undefined;
        responseOBJ.ResponseStatus = response.status;
      }
    } else {
      responseOBJ.ResponseStatus = ResponseStatus.UnprocessableEntity;
      responseOBJ.Status = false;
      responseOBJ.Message = await productSchema
        .validate(object)
        .catch((e) => e.message);
    }
    return responseOBJ;
  } catch (error) {
    console.log("error From post controller::>", error);
  }
}
