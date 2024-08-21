import React from "react";
import { Avatar, Flex, Container, Box } from "@chakra-ui/react";
import { IoSunnySharp } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";

const Navbar = () => {
  return (
    <Flex position="absolute" top="5" zIndex="100" right="5" w={{ base: "90%", lg:'20vw' }}>
      <Container
        backgroundColor="#1D2125"
        borderRadius="100px"
        h={{ base: "10vh", md: "8vh" }}
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={{ base: "2", md: "4" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flex="1"
          mr={{ base: "2", md: "4" }}
        >
          <IoSunnySharp size="24" color="#B6C2CF" cursor="pointer" />
          <BiHelpCircle size="24" color="#B6C2CF" cursor="pointer" />
        </Box>

        <Box
          w={{ base: "10", md: "12" }}
          h={{ base: "10", md: "12" }}
          borderRadius="50%"
          backgroundColor="#fff"
          p="1"
          cursor="pointer"
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </Box>
      </Container>
    </Flex>
  );
};

export default Navbar;
