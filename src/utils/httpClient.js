import axios from 'axios';
import {API_URL} from '../helpers/constants'
import authHeader from '../services/auth-header'
import authService from '../services/auth.service'
import {history} from '../helpers/history';

const httpClient = axios.create({
  baseURL: API_URL,
  responseType: "json"
});

httpClient.interceptors.request.use(function (config) {
    config.headers =  authHeader();
    return config;
});

httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  let status_code = error.response.status;
  if (status_code === 401) {
    authService.logout();
    history.push('/');
  }
  // return error;
  return Promise.reject({error});
});

export default httpClient;