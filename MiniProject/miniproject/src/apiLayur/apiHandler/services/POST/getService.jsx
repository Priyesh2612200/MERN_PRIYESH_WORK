import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const productServiceget = {
  getProduct: async (body) => {

    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.GET;
      reqestObj.url = productEndPoints.GET_PRODUCT;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from get services::>", error);
    }
  },
};
