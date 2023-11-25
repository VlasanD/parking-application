import {Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";

const tickets = [
  {
    location: "Buna ziua",
    from: "12/25/2023 05:05 AM",
    to: "12/25/2023 07:05 AM",
    price: "15.5"
  },
  {
    location: "Buna ziua",
    from: "12/25/2023 05:05 AM",
    to: "12/25/2023 07:05 AM",
    price: "15.5"
  },
  {
    location: "Buna ziua",
    from: "12/25/2023 05:05 AM",
    to: "12/25/2023 07:05 AM",
    price: "15.5"
  },
  {
    location: "Buna ziua",
    from: "12/25/2023 05:05 AM",
    to: "12/25/2023 07:05 AM",
    price: "15.5"
  },

]

function Rentals() {
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
                  <Td>{t.location}</Td>
                  <Td>{t.from}</Td>
                  <Td>{t.to}</Td>
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