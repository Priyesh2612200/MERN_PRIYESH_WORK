import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const productService = {
  createProduct: async (body) => {
    const reqestObj = new RequestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = productEndPoints.INSERT_PRODUCT;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from post services::>", error);
    }
  },
};
