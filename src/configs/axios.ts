import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
console.log("i am in axios file");
const BASE_URL = 'http://localhost:3000/api/v1';
export const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export default Api;