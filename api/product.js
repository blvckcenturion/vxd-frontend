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

export const getProductByCategoryApi = async (category, limit, start) => {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=createdAt:desc`;
        const startItems = `_start=${start}`;
        const url = `${BASE_PATH}/products?category.url=${category}&${limitItems}&${sortItems}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
        return null
    }
}
export const getTotalProductsPerCategoryApi = async (category) => {
    try {
        const url = `${BASE_PATH}/products/count?category.url=${category}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getProductByUrlApi = async (path) => {
    try {
        const url = `${BASE_PATH}/products?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
        return null;
     }
}

export const searchProductsApi = async (title) => {
    try {
        const url = `${BASE_PATH}/products?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}