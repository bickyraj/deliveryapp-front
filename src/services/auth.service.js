import axios from 'axios';

import { API_URL } from '../helpers/constants';
import authHeader from './auth-header';

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + 'login', {email, password})
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.data.access_token);
                    let user = this.getUser();
                    localStorage.setItem("user", user);
                }
                return response.data;
            });
    }

    getUser() {
       return axios
       .get(API_URL + 'user', {
            headers: authHeader()
       })
       .then((response) => {
           if (response.data.success) {
               return response.data.data;
           }
           return [];
       }); 
    }

    logout() {
      this.clearSession();
    }

    clearSession() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

export default new AuthService();