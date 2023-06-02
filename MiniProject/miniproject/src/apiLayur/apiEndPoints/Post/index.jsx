export const productEndPoints = {
  // INSERT_PRODUCT : async(data) => await api.post('/savePost', data),
  INSERT_PRODUCT: "/savePost",

  // GET_PRODUCT : async() => await api.get('/getPost'),
  GET_PRODUCT: "/getPost",

  // DELETE_PRODUCT : async(idvalue) => await api.delete(`/deletePost/${idvalue}`,idvalue),
  DELETE_PRODUCT: (idvalue) => `/deletePost/${idvalue}`,

  // UPDATE_PRODUCT : async(data,id) => await api.put(`/updatePost/${id}`,data)
  UPDATE_PRODUCT: (id) => `/updatePost/${id}`,


  INSERT_USER: "/userroutes/register",

  FETCH_USER: "/userroutes/getdata",

  FETCH_ALLUSER: "/userroutes/getalldata",

  UPDATE_USER: (id) => `/userroutes/userupdatedata/${id}`,

  DELETE_USER:(idvalue) => `/userroutes/userdeletedata/${idvalue}`,

  
};
