import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Link, useColorModeValue, FormErrorMessage, Alert, AlertIcon,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const REGISTER_URL = "http://localhost:8080/api/v1/auth/register";

const SignUp = () => {

  const [isLoading, setLoading] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit:  async (values) => {
      setLoading(true);
      await axios.post( REGISTER_URL, values)
        .then(
          response => {
            console.log("Registered");
            formik.resetForm();
            setIsRegistrationSuccessful(true);
          }
        ).catch(
          error => {
            console.log(error);
            setIsRegistrationSuccessful(false);
          });
      setLoading(false);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
      lastName: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters long").required("Required")
    })
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

        <Stack align={'center'}>

          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>

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
                isRegistrationSuccessful !== null && <RegistrationAlert isSuccess={isRegistrationSuccessful}/>
              }

              <HStack>

                <Box>

                  <FormControl id="firstName" isInvalid={formik.errors.firstName && formik.touched.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      type="text"
                      {...formik.getFieldProps("firstName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.firstName}
                    </FormErrorMessage>
                  </FormControl>

                </Box>

                <Box>

                  <FormControl id="lastName" isInvalid={formik.errors.lastName && formik.touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      type="text"
                      {...formik.getFieldProps("lastName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.lastName}
                    </FormErrorMessage>
                  </FormControl>

                </Box>

              </HStack>

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
                  type='password'
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>
                  {formik.errors.password}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10} pt={2}>

                <Button
                  type='submit'
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  isLoading={isLoading}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>

              </Stack>

              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link as={ReactRouterLink} color={'blue.400'} to="/signin">Login</Link>
                </Text>
              </Stack>

            </Stack>

          </form>

        </Box>

      </Stack>

    </Flex>
  )
}
export default SignUp;

const RegistrationAlert = ({ isSuccess }) => {
  return (
    <Alert status={isSuccess ? 'success' : 'error'} rounded={'lg'} >
      <AlertIcon/>
      {isSuccess ? 'Registration successful!' : 'Registration failed. Please try again.'}
    </Alert>
  );
};