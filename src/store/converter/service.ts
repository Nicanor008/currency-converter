import axios from "axios";
import { Base_API_URL, API_KEY } from "../../constants";

async function getCurrencyListService() {
    console.log('%cservice.ts line:5', 'color: #007acc;', Base_API_URL);
    const res = await axios.get(`${Base_API_URL}list?api_key=${API_KEY}`);
    return handleResponse(res);
}

async function convertCurrency(inputValue: any) {
    const res = await axios.get(`${Base_API_URL}convert?api_key=${API_KEY}&from=${inputValue?.baseCurrency}&to=${inputValue?.newCurrency}&amount=${inputValue?.currency}`)
    return handleResponse(res);
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
    convertCurrency,
}
