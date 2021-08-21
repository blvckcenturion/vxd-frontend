import { BASE_PATH } from '../utils/constants';

export const getCategoriesApi = async () => {
    try {
        const url = `${BASE_PATH}/categories?_sort=position:asc`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}