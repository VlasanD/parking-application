import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import ParkingCard from "./ParkingCard";
import Map from "./Map";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const MapPage = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBgSvt1UygxIe2XLsMCQAuiYOSmV_IW2C8" });
  const location = useLocation();
  const { parkings, inDate, outDate } = location.state;
  // CAREFUL HERE
  const [ center, setCenter ] = useState({ lat: 46.770014, lng: 23.589608 })
  const zoom = 14;
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >

      {
        isLoaded ?
          (
            <Stack spacing={8} py={20} px={6} minW="95%" direction={['column', 'column', 'column', 'row']} >
              <Map zoom={zoom} center={center} />
              <Stack overflowY={"scroll"} height={"80vh"}>
                {
                  parkings.map((
                    parking =>
                      <ParkingCard
                        key = {parking.id}
                        imageURL = {parking.imageUrl}
                        description = {"Base price per hour: " + parking.price + " RON"}
                        title = {parking.name} 
                        lat = {parking.latitude}
                        lng = {parking.longitude}
                        setCenter = {setCenter}
                        idParking = {parking.id}
                        inDate = {inDate}
                        outDate = {outDate}
                        />
                  ))
                }

              </Stack>
            </Stack>
          )
          :
          (
            <Text>Loading...</Text>
          )
      }

    </Flex>
  )
}

export default MapPage;
