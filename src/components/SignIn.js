import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Link, Text, useColorModeValue, FormErrorMessage, Alert, AlertIcon, } from '@chakra-ui/react'
import { useFormik } from 'formik';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const LOGGING_IN_URL = "http://localhost:8080/api/v1/auth/authenticate";

const SignIn = () => {

  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isLoggedInSuccessful, setIsLoggedInSuccessful] = useState(null);

  const formik = useFormik({
    initialValues: {
      email : "",
      password : "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await axios.post(LOGGING_IN_URL, values)
        .then(
          response => {
            setToken(response.data);
            console.log("Logged in");
            setIsLoggedInSuccessful(true);
            navigate("/");
          }
        ).catch(error => {
          console.log(error);
          setIsLoggedInSuccessful(false);
        });
      setLoading(false);  
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters long").required("Required")
    })
  }
  )

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign In</Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >

          <form onSubmit={formik.handleSubmit}>

            <Stack spacing={4}>

            {
                isLoggedInSuccessful !== null && <LoggingAlert isSuccess={isLoggedInSuccessful}/>
              }

              <FormControl id="email" isInvalid={formik.errors.email && formik.touched.email}>
                <FormLabel>Email address</FormLabel>
                <Input 
                  id="email" 
                  name="email"
                  placeholder="Email"
                  type="email" 
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>
                  {formik.errors.email}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={formik.errors.password && formik.touched.password}>
                <FormLabel>Password</FormLabel>
                <Input 
                  id="password" 
                  name="password"
                  placeholder="Password"
                  type="password" 
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>
                  {formik.errors.password}
                </FormErrorMessage>
              </FormControl>

              <Button
                type='submit'
                bg={'blue.400'}
                color={'white'}
                isLoading={isLoading}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>

              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Link as={ReactRouterLink} color={'blue.400'} to="/signup">Register</Link>
                </Text>
              </Stack>

            </Stack>

          </form>

        </Box>

      </Stack>

    </Flex>
  );
}

export default SignIn;

const LoggingAlert = ({ isSuccess }) => {
  return (
    <Alert status={isSuccess ? 'success' : 'error'} rounded={'lg'} >
      <AlertIcon/>
      {isSuccess ? 'Logged in successfuly!' : 'The username or password is incorrect'}
    </Alert>
  );
};