import React from "react";
import { Text, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";

const ChatHeader = () =>{
    return (
    <HStack fontSize={"4xl"} p={2}>
       
        <FontAwesomeIcon icon={faUserGear} size="lg" />
        <Text>Technical Support</Text>
    
    </HStack>
    );
}
export default ChatHeader;