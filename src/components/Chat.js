import {Divider, Flex, Stack, useColorModeValue} from "@chakra-ui/react";
import ChatFooter from "./chat_components/ChatFooter";
import Messages from "./chat_components/Messages";
import ChatHeader from "./chat_components/ChatHeader";
import React, {useState} from "react";

function Chat() {
  const [messages, setMessages] = useState([
    {from: "computer", text: "Hi, how can I help you today?"},
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, {from: "me", text: data}]);
    setInputMessage("");

    // TODO make it
    setTimeout(() => {
      setMessages((old) => [...old, {from: "computer", text: data}]);
    }, 1000);
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
    
      <Stack
        maxW={'lg'}
        rounded='lg'
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow='lg'
        overflow={'hidden'}
      >
        <ChatHeader/>
        <Divider/>
        <Messages messages={messages}/>
        <ChatFooter
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
     
      </Stack>
   
    </Flex>
  );
}

export default Chat;