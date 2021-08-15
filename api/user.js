import { BASE_PATH } from "../utils/constants"

export const registerApi = async (formData) => {
    try {
        const url = `${BASE_PATH}/auth/local/register`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const loginApi = async (formData) => {
    try {
        const url = `${BASE_PATH}/auth/local`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (e) {
        console.log(e);
    }
}