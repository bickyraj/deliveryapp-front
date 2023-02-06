import { API_URL } from '../helpers/constants';
import httpClient from '../utils/httpClient';

class VendorService {
    async create(data) {
        return await httpClient.post(API_URL + 'admin/vendors', data);
    }
}

export default new VendorService();