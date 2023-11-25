import { GoogleMap, Marker } from "@react-google-maps/api";

function Map({ zoom, center}) {
    return (
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName="map-container"
      >
        
        <Marker position={center}></Marker>
      
      </GoogleMap>
  
    );
  }
  
  export default Map;