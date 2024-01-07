import {  Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

const TICKET_URL = "http://localhost:8080/api/ticket/add";

const ParkingCard = ({ imageURL, title, description, lat, lng, setCenter, idParking, inDate, outDate}) => {
    const changeLocation = () => {
      setCenter({
        lat: lat,
        lng: lng  
      })
    }

    const buyTicket = () => {
      function dateFormatter(dateString){
        const localDateTime = new Date(dateString);

        return localDateTime.toISOString();
      }

      const ticketRequest = {
        idParking : idParking,
        dataIn: dateFormatter(inDate),
        dataOut: dateFormatter(outDate)
      } 
      
      async function addTicket(){
        console.log(inDate);
        await axios.post(TICKET_URL, ticketRequest)
          .then(
            response => {
              alert("Ticket purchased");
            }
          ).catch(error => {console.log(error)});
      }
      addTicket();
    }

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
              
              <Button 
              variant='solid' 
              colorScheme='blue'
              onClick={changeLocation}
              >
                Location
              </Button>
              <Button 
                variant='solid' 
                colorScheme='blue'
                onClick={buyTicket}
                >
                Get your ticket
              </Button>
          
            </Stack>
        
          </CardFooter>
       
        </Stack>
      </Card>
      );
  }

  export default ParkingCard;