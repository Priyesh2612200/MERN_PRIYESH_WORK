import { requestMethod } from "../../../../../src/apiLayur/apiUtils/constants";
import { RequestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository";
import { productEndPoints } from "../../../apiEndPoints/Post/index";

export const usergetServiceget = {
  getProduct: async (body) => {

    const reqestObj = new RequestModel();
    const token = localStorage.getItem('token');

    try {
      reqestObj.method = requestMethod.GET;
      reqestObj.url = productEndPoints.FETCH_USER;
      reqestObj.data = body;
      reqestObj.headers = {
        Authorization: `Bearer ${token}`,
      }
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from get  user services::>", error);
    }
  },
};
