import OrderService from "../services/order.service";

export const create = (data) => (dispatch) => {
    return OrderService.create(data).then((res) => {
        return Promise.resolve(res);
    }).catch((error) => {
        return Promise.reject(error.error);
    });
}