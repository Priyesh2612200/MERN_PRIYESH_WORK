import axios from 'axios';
export const userpostAPIData=(data)=>  axios.post('http://localhost:4000/authroutes/register',data);

export const updateAPIDATA=(data,id)=>  axios.put(`http://localhost:4000/authroutes/updatedata/${id}`, data)

export const getAllUser=()=>  axios.get(`http://localhost:4000/authroutes/getalldata`)