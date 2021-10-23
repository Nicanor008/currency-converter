import axios from "axios";
// import { Base_API_URL, API_KEY } from "../../constants";

async function getCurrencyListService() {
    const res = await axios.get(`https://api.getgeoapi.com/v2/currency/list?api_key=1e15f225b198772d5bab9b02791f1646c3a310fc`);
    return handleResponse(res);
    // return axios.get(`${Base_API_URL}/list?api_key=${API_KEY}`).then(handleResponse);
}

async function convertCurrency(inputValue: any) {
    const res = await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=1e15f225b198772d5bab9b02791f1646c3a310fc&from=${inputValue?.baseCurrency}&to=${inputValue?.newCurrency}&amount=${inputValue?.currency}`)
    return handleResponse(res);
    // return axios.get(`${Base_API_URL}/list?api_key=${API_KEY}`).then(handleResponse);
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
