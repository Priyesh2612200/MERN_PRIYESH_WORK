import { CommanResponse } from "../../../apiUtils/models/commonResponse";
import * as Yup from "yup";
import { userService } from "../../services/USER/userService";
import { ResponseStatus } from "../../../apiUtils/interfacesAndTypes";
export const userController = {
  insertUser,
};
async function insertUser(object) {
  try {
    let responseOBJ = new CommanResponse();

    let productSchema = Yup.object({
        name: Yup.string().required(),

        email: Yup.string().required(),

        password: Yup.string().required(),

        mobile: Yup.string().required(),

        address: Yup.string().required(),

        pincode: Yup.string().required(),
    });

    if (await productSchema.isValid(object)) {
      const response = await userService.createUser(object);

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
    console.log("error From User controller::>", error);
  }
}
