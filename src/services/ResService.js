import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL =  import.meta.env.VITE_HOST_API_ADDRESS+'/reservation';


axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {

    return Promise.reject(error);
  });
  
export const getAllReservations = () => axios.get(BASE_REST_API_URL)

export const saveResa = (todo) => axios.post(BASE_REST_API_URL, todo)

export const getResa = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateResa = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteResa = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeResa = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteResa = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')