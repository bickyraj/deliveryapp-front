import VendorService from "../services/carrier.service";

export const create = (data) => (dispatch) => {
    return VendorService.create(data).then((res) => {
        return Promise.resolve(res);
    }).catch((error) => {
        return Promise.reject(error.error);
    });
}