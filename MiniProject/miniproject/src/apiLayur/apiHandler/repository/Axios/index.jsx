import { api } from './interceptors';

// export const axiosRepository = {
//   request: async (requestModal: requestInterface) =>
//     await api.request(JSON.parse(JSON.stringify(requestModal)))
// };
export const axiosRepository = {
  request: async (requestModal) => {
    return await api.request(JSON.parse(JSON.stringify(requestModal)));
  }
};
