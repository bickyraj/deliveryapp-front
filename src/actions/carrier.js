import CarrierService from "../services/carrier.service";

export const create = (data) => (dispatch) => {
    return CarrierService.create(data).then((res) => {
        return Promise.resolve(res);
    }).catch((error) => {
        return Promise.reject(error.error);
    });
}