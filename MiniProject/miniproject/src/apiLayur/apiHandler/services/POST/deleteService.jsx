import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const productServicedelete = {
  deleteProduct: async (idvalue) => {
    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.DELETE;
      reqestObj.url = productEndPoints.DELETE_PRODUCT(idvalue);
      //reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from delete services::>", error);
    }
  },
};
