import axios from 'axios'
export const InsertStockData =(data)=>  axios.post('http://localhost:4000/createStock',data)
export const getAllStock=()=>  axios.get(`http://localhost:4000/getStock`)
export const daleteAPIstock=(id)=>  axios.delete(`http://localhost:4000/deleteStock/${id}`)

export const InsertAPIOrder=(data)=>  axios.post(`http://localhost:4000/createOrder`,data)
export const getAllorder=()=>  axios.get(`http://localhost:4000/getorder`)