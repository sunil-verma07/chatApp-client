import React from "react";
import { Flex, Box,Text } from "@chakra-ui/react";

const ChatComponent = ({ from,text,isTyping }) => {
  return (
    <Flex
      display="flex"
      justifyContent={from === "user" ? "flex-end":"flex-start"}
      alignItems="center"
      backgroundColor="#101214"
      w="full"
      my="2"
    >
      <Box
        backgroundColor={from === "user" ? "rgba(56,65,74,0.4)" : "rgb(56,65,74)"}
        borderRadius="20px"
        minHeight="2.5rem"
        maxWidth="60vw"
        px={{base:"3",md:"4"}}
        py={{base:"3",md:"4"}}
      >
        {isTyping ? <div class="dots-3"></div> : <Text fontSize={{ base: '12px', md: '13px', lg: '16px' }}>{text}</Text>}
      </Box>
    </Flex>
  );
};

export default ChatComponent;
