import axios from 'axios';

export const postAPIData=(data)=>  axios.post('http://localhost:4000/form',data)