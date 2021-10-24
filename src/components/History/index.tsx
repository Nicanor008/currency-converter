import React, { useEffect, useState } from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import { convertToNumber } from '../../helpers/convertStringToNumber';

const History = (): JSX.Element => {
    const [history, setHistory] = useState<any>({});

    // // get all items in localstorage
    useEffect(() => {
        for (let a in localStorage) {
            typeof localStorage[a] === 'string' && a !== 'chakra-ui-color-mode' && setHistory(localStorage); // only retrieve user data and not localstorage methods and properties
         };
    }, [])

    // convert string to object
    const jsonifyData = (item: any) => JSON.parse(history[item])

    // Extract formatted data
    const historyDataItems = history &&
        Object.keys(history).map((item: string) => (
            <Box key={item}>
                <Box textAlign="left" py="5px">
                    <Text>
                        {`
                            ${convertToNumber(jsonifyData(item)?.currency?.amount)} 
                            ${jsonifyData(item)?.currency?.base_currency_code} = 
                            ${convertToNumber(jsonifyData(item)?.currency?.rates[jsonifyData(item)?.inputs?.newCurrency]?.rate_for_amount)}
                            ${jsonifyData(item)?.inputs?.newCurrency}
                        `}
                    </Text>
                    <Text color="gray.500" fontSize="15px">
                        1 {jsonifyData(item)?.currency?.base_currency_code} = {jsonifyData(item)?.currency?.rates[jsonifyData(item)?.inputs?.newCurrency]?.rate} {jsonifyData(item)?.inputs?.newCurrency}
                    </Text>
                </Box>
                <hr />
            </Box>
        ));

    return (
        <Box
            boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
            py={5}
            borderRadius="10px"
        >
            {
                Object.entries(history).length > 0 && (
                    <div>
                        {history &&
                            <>
                                <Heading
                                    as="h5"
                                    fontSize="20px"
                                    pb={2}
                                    px={10}
                                >
                                    Your Conversion History
                                </Heading>
                                <hr />
                            </>
                        }
                        <Box
                            maxHeight="500px"
                            height="fit-content"
                            overflowY="scroll"
                            px={10}
                        >
                            {historyDataItems}
                        </Box>
                    </div>
                )
            }
        </Box>
    )
}

export default History
