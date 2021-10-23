import { currencyConstants } from "./constants";

const initialState = {
    loading: false,
    error: null,
    items: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
    switch (action.type) {
        case currencyConstants.GET_CURRENCY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                items: null,
            };
        case currencyConstants.GET_CURRENCY_LIST_SUCCESS:
            return {
                ...state,
                loading: null,
                error: null,
                items: action.data,
            };
        case currencyConstants.GET_CURRENCY_LIST_FAILURE:
            return {
                ...state,
                loading: null,
                error: action.error,
                items: null,
            };
        case currencyConstants.CONVERT_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                convertedCurrency: null,
            };
        case currencyConstants.CONVERT_CURRENCY_SUCCESS:
            return {
                ...state,
                loading: null,
                error: null,
                convertedCurrency: action.data,
            };
        case currencyConstants.CONVERT_CURRENCY_FAILURE:
            return {
                ...state,
                loading: null,
                error: action.error,
                convertedCurrency: null,
            };
        default:
            return state
    }
}
