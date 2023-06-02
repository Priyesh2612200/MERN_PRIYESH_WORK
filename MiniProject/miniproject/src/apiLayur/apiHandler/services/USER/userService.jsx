import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const userService = {
    createUser: async (body) => {
    const reqestObj = new RequestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = productEndPoints.INSERT_USER;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from user services::>", error);
    }
  },
};
