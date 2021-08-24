import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';
import { size } from 'lodash';
export const isFavoritedApi = async (idUser, idProduct, logout) => {
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}&product=${idProduct}`;
        return await authFetch(url, null, logout);
    } catch (e) {
        console.log(e);
        return null;
    } 
}

export const addFavoritedApi = async (idUser, idProduct, logout) => {
    try {
        const dataFound = await isFavoritedApi(idUser, idProduct, logout);
        console.log(!dataFound);
        if (size(dataFound) || !dataFound) {
            return "Ya esta en favoritos";
        } else {
            const url = `${BASE_PATH}/favorites`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user: idUser, product: idProduct})
            }
            const result = await authFetch(url, params, logout);
            return result;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const deleteFavoritedApi = async (idUser, idProduct, logout) => {
    try {
        const dataFound = await isFavoritedApi(idUser, idProduct, logout);
        if (size(dataFound)) {
            const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const result = await authFetch(url, params, logout);
            return result;
        }
        const result = await authFetch(url, params, logout);
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getFavoritedApi = async (idUser, logout) => {
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}