import axios from 'axios';

import { API_URL } from '../helpers/constants';
import httpClient from '../utils/httpClient';

class RoleService {
    async remove(roleId) {
        return await httpClient.post(API_URL + 'admin/roles/delete', {role_id: roleId});
    }
}

export default new RoleService();