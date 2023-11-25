import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import ParkingCard from "./ParkingCard";
import Map from "./Map";
import parking_image from "./parking.jpg";

const parkings = [

  {
    url: parking_image,
    title: 'Central Parking',
    descr: 'Near Piata Unirii, Central Shopping Center and Technical University, on Daicovici 54',
    coord: { lat: 46.771369, lng: 23.586161 }
  },
  {
    url: parking_image,
    title: 'Central Parking',
    descr: 'Near Piata Unirii, Central Shopping Center and Technical University, on Daicovici 54',
    coord: { lat: 46.771369, lng: 23.586161 }
  },
  {
    url: parking_image,
    title: 'Central Parking',
    descr: 'Near Piata Unirii, Central Shopping Center and Technical University, on Daicovici 54',
    coord: { lat: 46.771369, lng: 23.586161 }
  },
  {
    url: parking_image,
    title: 'Central Parking',
    descr: 'Near Piata Unirii, Central Shopping Center and Technical University, on Daicovici 54',
    coord: { lat: 46.771369, lng: 23.586161 }
  },

];



const MapPage = ({ center, zoom, }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBgSvt1UygxIe2XLsMCQAuiYOSmV_IW2C8" });
  // CAREFUL HERE
  center = { lat: 46.770014, lng: 23.589608 };
  zoom = 14;
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
                {parkings.map((parking => <ParkingCard imageURL={parking.url} description={parking.descr} title={parking.title} />
                ))}

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
