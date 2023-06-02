import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const userServiceupdate = {
  updateUser: async (body, id) => {
    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.PUT;
      reqestObj.url = productEndPoints.UPDATE_USER(id);
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from user update services::>", error);
    }
  },
};
