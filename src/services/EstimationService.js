import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL =  import.meta.env.VITE_HOST_API_ADDRESS+'/estimation';


axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {

    return Promise.reject(error);
  });
  
export const getAllEstimations = () => axios.get(BASE_REST_API_URL)

export const saveEstimation = (estimation) => axios.post(BASE_REST_API_URL, estimation)

export const getEstimation = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateEstimation = (id, estimation) => axios.put(BASE_REST_API_URL + '/' + id, estimation)

export const deleteEstimation = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

