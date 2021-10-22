import axios from "axios";
import { Base_API_URL, API_KEY } from "../../constants";

function getCurrencyListService() {
    return axios.get(`${Base_API_URL}/list?api_key=${API_KEY}`).then(handleResponse);
}

export function handleResponse(res: { status?: number; data?: any; response?: any; }) {
    if (res.status === 200 || res.status === 201) {
        const { data } = res;
        return data;
    }
    const { response } = res;
    const { data } = response;
    const { message } = data;
    return Promise.reject(message);
}

export const currencyService = {
    getCurrencyListService,
}
