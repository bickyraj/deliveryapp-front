import { API_URL } from '../helpers/constants';
import httpClient from '../utils/httpClient';

class OrderService {
    async create(data) {
        return await httpClient.post(API_URL + 'admin/orders', {data});
    }
}

export default new OrderService();