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
} from "@chakra-ui/react"
import { Formik, Form } from 'formik'
import { Logo } from "../Logo"
import { useSelector, useDispatch } from "react-redux"
import { currencyActions } from "../store/converter/action";
import axios from "axios"

export const HomePAge = () => {
    const currency = useSelector((state: any) => state.currencyList);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<number>(1);

    /**
     * Fetch Assets, Applications and Users on first load
     */
     useEffect(() => {
        dispatch(currencyActions.getCurrencyList());
        // eslint-disable-next-line
    }, [dispatch])

    // Get individual currency details
    const tt = currency?.items?.currencies &&
        Object.keys(currency?.items?.currencies).map((tr: string) => (
            <option value={tr} key={tr}>
                {tr} - {currency?.items?.currencies[tr]}
            </option>
        ));

    const onChangeHandler = (e: any) => {
        setInputValue(e.target.value);
    }

    console.log('%chome.tsx line:51', 'color: #007acc;', inputValue);

    return (
        <Box>
            <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <FormControl>
                <Formik
                    initialValues={{}}
                    // validate={}
                    onSubmit={(values, { setSubmitting }) => {
                    
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
                                // onKeyDown={onKeyDownHandler}
                            />
                            <Select name="Base Currency" placeholder='EUR'>
                                {tt}
                            </Select>
                            <Select name="New Currency" placeholder="KSH">
                                {tt}
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
