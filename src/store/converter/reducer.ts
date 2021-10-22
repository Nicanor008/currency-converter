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
            return { ...state, loading: true, error: null, items: null };
        case currencyConstants.GET_CURRENCY_LIST_SUCCESS:
            return { ...state, loading: null, error: null, items: action.data };
        case currencyConstants.GET_CURRENCY_LIST_FAILURE:
            return { ...state, loading: null, error: action.error, items: null };
        default:
            return state
    }
}
