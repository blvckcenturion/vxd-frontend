import { getToken, hasExpiredToken } from '../api/token';

export async function authFetch(url, params, logout) {
    const token = getToken();
    if (!token) {
        //Usuario no loggeado
        logout();
    } else {
        if (hasExpiredToken(token)) {
            // Token expirado
            logout();
        } else {
            // Token válido
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;
            } catch (e) {
                return e;
            }
            
        }
    }
}