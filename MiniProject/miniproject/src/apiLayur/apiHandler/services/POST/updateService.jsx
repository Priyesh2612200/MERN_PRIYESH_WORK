import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const productServiceupdate = {
  updateProduct: async (body, id) => {
    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.PUT;
      reqestObj.url = productEndPoints.UPDATE_PRODUCT(id);
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from update services::>", error);
    }
  },
};
