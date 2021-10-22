import { Button, Image, Heading, Flex, Box, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import InterviewInstructions from '../assets/images/interview-instructions.png'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Flex pt="5" justifyContent="space-around">
        <Box alignSelf="center">
          <Heading as="h1">About</Heading>
          <Text py="2">This is an interview coding test by CodeHead</Text>
          <Button
            className="btn"
            cy-data="go-back-button"
            onClick={() => history.push('/')}
            bg="#5579FB"
            _hover={{
              bg: '#5579FB',
            }}
          >
            Go back
          </Button>
        </Box>
        <Image src={InterviewInstructions} alt="interview instructions" />
      </Flex>
    </Fragment>
  )
}
