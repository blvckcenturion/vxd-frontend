import { BASE_PATH } from '../utils/constants';

export const getLatestProductsApi = async (limit) => {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = "&_sort=createdAt:desc";
        const url = `${BASE_PATH}/products?${limitItems}${sortItem}`;
        const response = await fetch(url);
        const result = response.json();
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}