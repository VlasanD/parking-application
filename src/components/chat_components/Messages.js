import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Messages = ({messages}) =>{
    const messagesEndRef = useRef();
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };    
    useEffect(() => scrollToBottom, [messages]);

    return (
        <Flex  overflowY="scroll"  flexDirection="column" p="2" maxHeight="25rem" minHeight={'25rem'}>
          {
            messages.map((item, index) => {
              if (item.from === "me") {
                return (
                  <Flex key={index} w="100%" justify="flex-end">
                    <Flex
                      bg="black"
                      color="white"
                      maxW="70%"
                      my="1"
                      p="3"
                      rounded='lg'
                    >

                      <Text overflowX='auto'  overflowWrap='break-word'>{item.text}</Text>
                    
                    </Flex>
                  
                  </Flex>
                );
            } else {
              return (
                <Flex key={index} w="100%">
                  
                  <Avatar
                    name="Computer"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    bg="blue.300"
                    margin={2}
                  />
                 
                  <Flex
                    bg="gray.100"
                    color="black"
                    maxW="70%"
                    my="1"
                    p="3"
                    rounded='lg'
                  >
                  
                    <Text overflowX='auto'  overflowWrap='break-word'>{item.text}</Text>
                  
                  </Flex>

                </Flex>
              );
            }
          })}
          <div ref={messagesEndRef}></div>
          
        </Flex>
      );
}
export default Messages;