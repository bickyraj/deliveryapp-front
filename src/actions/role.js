import RoleService from "../services/role.service";

export const remove = (roleId) => (dispatch) => {
    return RoleService.remove(roleId).then((data) => {
        return Promise.resolve(data);
    }).catch((error) => {
        return Promise.reject(error.error);
    });
}