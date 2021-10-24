import React, { useEffect, useState } from "react"
import {
    Box,
    VStack,
    Grid,
    Select,
    FormControl,
    Button,
    Input,
    Flex,
    Text,
} from "@chakra-ui/react"
import { Formik, Form } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import { Logo } from "../Logo"
import { useSelector, useDispatch } from "react-redux"
import { currencyActions } from "../store/converter/action";
import Loader from "../components/Loader"
import History from "../components/History"
import { convertToNumber } from "../helpers/convertStringToNumber"

export const HomePAge = () => {
    const currency = useSelector((state: any) => state.currencyList);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<any>({
        baseCurrency: 'EUR',
        newCurrency: 'KES'
    });

    /**
     * Fetch Assets, Applications and Users on first load
     */
    useEffect(() => {
        dispatch(currencyActions.getCurrencyList());
        // eslint-disable-next-line
    }, [dispatch])

    // Get individual currency details
    const currencyItems = currency?.items?.currencies &&
        Object.keys(currency?.items?.currencies).map((item: string) => (
            <option value={item} key={item}>
                {item} - {currency?.items?.currencies[item]}
            </option>
        ));

    const onChangeHandler = (e: any) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
        // convert currency on changing the previously selected currency
        e.target.type === "select-one" && inputValue?.currency && dispatch(currencyActions.convertCurrency(inputValue));
    }

    const swapInputValues = () => {
        setInputValue({
            ...inputValue,
            baseCurrency: inputValue.newCurrency,
            newCurrency: inputValue.baseCurrency,
        })
        dispatch(currencyActions.convertCurrency({
            ...inputValue,
            baseCurrency: inputValue.newCurrency,
            newCurrency: inputValue.baseCurrency,
        }))
    }

    // save user conversion to localstorage
    useEffect(() => {
        if (
            currency?.convertedCurrency !== null &&
            currency?.convertedCurrency !== undefined &&
            inputValue.currency !== undefined
        ) {
            localStorage.setItem(
                uuidv4(),
                JSON.stringify({
                    currency: currency?.convertedCurrency,
                    inputs: inputValue,
                }),
            )
        }
    }, [inputValue, currency?.convertedCurrency])

    return (
        <Box>
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <VStack spacing={8} alignSelf="center">
                        <Logo h="10vmin" pointerEvents="none" />
                        {currency?.loading && (
                            <Loader />
                        )}
                        {inputValue !== 0 && currency?.convertedCurrency?.amount !== undefined &&
                            <Text textAlign="left">
                                {`
                                    ${convertToNumber(currency?.convertedCurrency?.amount)} 
                                    ${currency?.convertedCurrency?.base_currency_code} = 
                                    ${convertToNumber(currency?.convertedCurrency?.rates[inputValue?.newCurrency]?.rate_for_amount)}
                                    ${inputValue?.newCurrency}
                                `}
                                <br />
                                <strong>Rates:</strong>
                                <br />
                            1 {currency?.convertedCurrency?.base_currency_code} = {currency?.convertedCurrency?.rates[inputValue?.newCurrency]?.rate} {inputValue?.newCurrency}
                            </Text>
                        }
                        <FormControl>
                            <Formik
                                initialValues={{}}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(false)
                                    dispatch(currencyActions.convertCurrency(inputValue))
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Flex>
                                            <Input
                                                type="number"
                                                name="currency"
                                                border="1px solid"
                                                placeholder="£1"
                                                onChange={onChangeHandler}
                                                mr={6}
                                            />
                                            <Select
                                                name="baseCurrency"
                                                placeholder='EUR - Euro'
                                                onChange={onChangeHandler}
                                                value={inputValue?.baseCurrency}
                                                mr={3}
                                            >
                                                {currencyItems}
                                            </Select>
                                            <Button
                                                onClick={swapInputValues}
                                                minWidth="fit-content"
                                                bg="white"
                                                _hover={{ bg: "white" }}
                                                outline="0"
                                                boxShadow="0"
                                                _active={{ outline: "0", boxShadow: "0" }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="blue"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-repeat"
                                                >
                                                    <polyline points="17 1 21 5 17 9"></polyline>
                                                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                                                    <polyline points="7 23 3 19 7 15"></polyline>
                                                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                                                </svg>
                                            </Button>
                                            
                                            <Select
                                                name="newCurrency"
                                                placeholder="KES - Kenyan Shilling"
                                                onChange={onChangeHandler}
                                                value={inputValue?.newCurrency}
                                                ml={3}
                                            >
                                                {currencyItems}
                                            </Select>
                                        </Flex>
                                        <Button
                                            bg={`${inputValue?.currency !== undefined ? "#5579FB" : 'grey'}`}
                                            color="white"
                                            mt="3"
                                            isDisabled={inputValue?.currency === undefined}
                                            cursor={inputValue?.currency === undefined ? 'default' : 'pointer'}
                                            _hover={{
                                                bg: inputValue?.currency !== undefined ? "#5579FB" : 'grey'
                                            }}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Convert
                                </Button>
                                    </Form>
                                )}
                            </Formik>
                        </FormControl>

                        {/* history */}
                        <History />
                    </VStack>
                </Grid>
            </Box>
        </Box>
    )
}
