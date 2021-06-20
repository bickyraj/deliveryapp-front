import { API_URL } from '../helpers/constants';
import httpClient from '../utils/httpClient';

class CarrierService {
    async create(data) {
        return await httpClient.post(API_URL + 'admin/carriers', data);
    }
}

export default new CarrierService();