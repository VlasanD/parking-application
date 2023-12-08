import {Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

// TODO connect to backend
const TICKETS_URL = "http://localhost:8080/api/ticket";

function Rentals() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets(){
    await axios.get(TICKETS_URL)
      .then(response => {
        setTickets(response.data);
      }).catch(error => console.log(error));
      }
    fetchTickets();
  }, []);

  return (
    <Flex
      paddingTop="100"
      paddingBottom="100"
      minH={"100vh"}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
     
      <TableContainer
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
      >
     
        <Table variant='simple' size='lg'>
     
          <TableCaption>Your rentals</TableCaption>
         
          <Thead>
            <Tr>
              <Th>Location</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
        
          <Tbody>
          
            {tickets.map(t => {
              return (
                <Tr>
                  <Td>{t.parkingName}</Td>
                  <Td>{t.dataIn}</Td>
                  <Td>{t.dataOut}</Td>
                  <Td>{t.price + " RON"}</Td>

                </Tr>
              );
            })}
         
          </Tbody>
       
        </Table>
      
      </TableContainer>
   
    </Flex>
  );
}

export default Rentals;