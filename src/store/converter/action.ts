import { currencyService } from "./service";
import { currencyConstants } from "./constants";

function getCurrencyList() {
    return (dispatch: any) => {
        dispatch(request());

        currencyService.getCurrencyListService()
            .then(
                (data) => {
                    dispatch(success(data));
                },
                (error: any) => {
                    dispatch(failure(error));
                },
            );
    };

    function request() { return { type: currencyConstants.GET_CURRENCY_LIST_REQUEST }; }
    function success(data: any) { return { type: currencyConstants.GET_CURRENCY_LIST_SUCCESS, data }; }
    function failure(error: any) { return { type: currencyConstants.GET_CURRENCY_LIST_FAILURE, error }; }
}

export const currencyActions = {
    getCurrencyList,
}
