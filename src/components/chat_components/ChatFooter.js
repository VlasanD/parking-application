import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const ChatFooter = ({ inputMessage, setInputMessage, handleSendMessage }) =>{
    return ( <Flex w="100%" rounded={'lg'} size="lg" >
  	<Input
		size='lg'
    	placeholder="Type Something..."
		_focus={{
      		border: "1px solid black",
    	}}
    	onKeyDown={(e) => {
      	if (e.key === "Enter") {
        	handleSendMessage();
      	}
    	}}
    	value={inputMessage}
    	onChange={(e) => setInputMessage(e.target.value)}
  	/>
  	
	<Button
		size='lg'
    	bg="black"
    	color="white"
    	_hover={{
      	bg: "white",
      	color: "black",
      	border: "1px solid black",
    	}}
    	disabled={inputMessage.trim().length <= 0}
    	onClick={handleSendMessage}
  	>
    	Send
  	</Button>
	
	</Flex>
    );
}
export default ChatFooter;