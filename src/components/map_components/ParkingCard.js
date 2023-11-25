import {  Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";

const ParkingCard = ({ imageURL, title, description}) => {
    return (
      <Card
        direction={{ base: 'column', md: 'row' }}
        
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', md: '45%' }}
          rounded={8}
          src= {imageURL}
          alt='Parking lot'
        />
  
        <Stack>
         
          <CardBody>
           
            <Heading size='md'>{title}</Heading>
            <Text py='2'>
              {description}
            </Text>
         
          </CardBody>
  
          <CardFooter>
           
            <Stack direction={ 'row' } > 
              
              <Button variant='solid' colorScheme='blue'>
                Location
              </Button>
              <Button variant='solid' colorScheme='blue'>
                Get your ticket
              </Button>
          
            </Stack>
        
          </CardFooter>
       
        </Stack>
      </Card>
      );
  }

  export default ParkingCard;