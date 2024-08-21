import React from "react";
import Sidebar from "../components/Sidebar";
import { Flex,useDisclosure } from "@chakra-ui/react";
import BottomSearchBar from "../components/BottomSearchBar";
import ChatWindow from "../components/ChatWindow.js";

const Mainpage = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex
      w="100%"
      backgroundColor="#101214"
      minHeight="100vh"
      h="full"
      flexDir="row"
    >
      <Flex w={isOpen ? "15vw" : "5vw"} display={{ base:'none',lg: "none", xl: "flex" }}>
        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
      </Flex>

      <Flex w={isOpen ? "85vw" : "90vw"} mx="auto" flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flex="4">
          <ChatWindow />
        </Flex>
        <BottomSearchBar />
      </Flex>
    </Flex>
  );
};

export default Mainpage;
