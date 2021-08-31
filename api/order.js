import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const getOrdersApi = async (idUser, logout) => {
    try {
        const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
        const result = authFetch(url, null, logout);
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}