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
import { Logo } from "../Logo"
import { useSelector, useDispatch } from "react-redux"
import { currencyActions } from "../store/converter/action";
import Loader from "../components/Loader"

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

    // convert string to number and round off to decimal places
    const convertToNumber = (num: string) => (
        Number(num).toFixed(2)
    )

    const swapInputValues = () => {
        setInputValue({
            ...inputValue,
            baseCurrency: inputValue.newCurrency,
            newCurrency: inputValue.baseCurrency,
        })
        dispatch(currencyActions.convertCurrency({...inputValue,
            baseCurrency: inputValue.newCurrency,
            newCurrency: inputValue.baseCurrency}))
    }

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
                            {/* convert number to s */}
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
                            // validate={}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false)
                                dispatch(currencyActions.convertCurrency(inputValue))
                            }}
                        >
                            {({ isSubmitting }) => (
                            <Form>
                                <Flex>
                                    <Input
                                        type="text"
                                        name="currency"
                                        border="1px solid"
                                        placeholder="$1"
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
                                    <Button onClick={swapInputValues}>Swap</Button>
                                    <Select
                                        name="newCurrency"
                                        placeholder="KES - Kenyan Shilling"
                                        onChange={onChangeHandler}
                                        value={inputValue?.newCurrency}
                                        // defaultValue={inputValue?.newCurrency}
                                        ml={3}
                                    >
                                        {currencyItems}
                                    </Select>
                                </Flex>
                                <Button
                                    bg="#5579FB"
                                    color="white"
                                    mt="3"
                                    _hover={{
                                    bg: '#5579FB',
                                    }}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Form>
                            )}
                        </Formik>
                    </FormControl>
                </VStack>
            </Grid>
            </Box>
        </Box>
    )
}
