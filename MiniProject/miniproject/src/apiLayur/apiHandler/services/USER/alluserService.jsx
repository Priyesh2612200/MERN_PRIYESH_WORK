import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const alluserServiceget = {
    getAllUserdata: async (body) => {

    const reqestObj = new RequestModel();

    try {
      reqestObj.method = requestMethod.GET;
      reqestObj.url = productEndPoints.FETCH_ALLUSER;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from get all user services::>", error);
    }
  },
};
