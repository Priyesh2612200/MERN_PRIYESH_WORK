import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const userServicedelete = {
  deleteUser: async (idvalue) => {
    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.DELETE;
      reqestObj.url = productEndPoints.DELETE_USER(idvalue);
      //reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from  user delete services::>", error);
    }
  },
};
