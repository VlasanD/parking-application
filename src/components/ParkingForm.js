import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const districts = ["Andrei Mureșanu", "Becaș", "Borhanci", "Bulgaria", "Bună Ziua", "Centru", "Dâmbul Rotund", "Europa", "Făget", "Gheorgheni", "Grădini Mănăștur (Plopilor)", "Grigorescu", "Gruia", "Iris", "Între Lacuri", "Măgura", "Mănăștur", "Mărăști", "Someșeni", "Sopor", "Zorilor"];
const PARKING_URL = "http://localhost:8080/api/parking";

const ParkingForm = () => {

  const navigate = useNavigate();
  const [parkings, setParkings] = useState();

  const formatDateToInputDate = date => {
    const isoString = date.toISOString().slice(0, 16);
    return isoString.replace('T', ' ');
  }

  const formik = useFormik({
    initialValues: {
      district: "Andrei Mureșanu",
      from: formatDateToInputDate(new Date()),
      until: formatDateToInputDate(new Date()),
    },
    onSubmit: (values) => {
      const district = values.district;
      async function findParking() {
        await axios.get(PARKING_URL,
          {
            params: {
              district : district
            }
          }
        )
          .then(response => {
            setParkings(response.data);
            navigate("/map", { state: { parkings: response.data, inDate: values.from, outDate: values.until} });
          }).catch(error => console.log(error));
      }
      findParking();
    },

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
          <Heading fontSize={'4xl'}>Find your spot</Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >

          <form onSubmit={formik.handleSubmit}>

            <VStack spacing={4}>

              <FormControl>
                <FormLabel htmlFor="district"> Location </FormLabel>
                <Select id="district" name="district" {...formik.getFieldProps("district")}>
                  {districts.map(
                    val => {
                      return <option key={val} value={val}>{val}</option>;
                    })
                  }
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="from"> From </FormLabel>
                <Input
                  id="from" name="from"
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  min={formatDateToInputDate(new Date())}
                  {...formik.getFieldProps("from")}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="until"> Until </FormLabel>
                <Input
                  id="until" name="until"
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  min={formik.values.from}
                  {...formik.getFieldProps("until")}
                />
              </FormControl>

              <Button
                type="submit"
                width="full"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500', }}
              >
                Search
              </Button>

            </VStack>

          </form>

        </Box>

      </Stack>

    </Flex>
  );
}
export default ParkingForm;