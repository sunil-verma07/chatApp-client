import React,{useState} from 'react'
import { Box, Container, Input, useDisclosure, Button } from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GoNorthStar } from "react-icons/go";
import { searchNewQuery } from "../store/actions/chatAction.js";
import {useParams} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";

const BottomSearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {id} = useParams();
  const [query,setQuery] = useState('')


  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const searchQueryHandler = 
    async () => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(searchNewQuery(query,id));
        setQuery('')
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

  return (
    <Box
      pos="fixed"
      bottom="0"
      h={{ base: "20vh", md: "15vh", lg: "25vh" }}
      marginTop="2.5vh"
      borderTopRadius="30px"
      w={{ base: '95vw', md: '90vw', lg: '80vw', xl: '80vw' }}
      backgroundColor="#1D2125"
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent="space-evenly"
      alignItems="center"
      p={{ base: "4", md: "2" }}
    >
      <Button
        onClick={onOpen}
        leftIcon={<IoChatboxEllipsesOutline />}
        colorScheme='gray'
        variant='solid'
        maxWidth="12rem"
        mb={{ base: "2", md: "0" }}
        flex={{ base: 'none', md: '1' }}
      >
        View Chat
      </Button>

      <Container
        borderRadius="100px"
        w={{ base: "100%", md: "60%" }}
        h="10vh"
        backgroundColor="#101214"
        display="flex"
        alignItems="center"
        p="0"
        my={{ base: "2", md: "0" }}
      >
        <Box flex="1" borderLeftRadius="100px"></Box>
        <Input
          color="#B6C2CF"
          p="2"
          outline="none"
          flex="4"
          backgroundColor="#101214"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <Button
          disabled={query.length < 1}
          borderRadius="50%"
          cursor="pointer"
          backgroundColor="#B6C2CF"
          h="8vh"
          w="8vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          m="1vh"
          onClick={searchQueryHandler}
        >
          <FaArrowRight color="#101214" size="20" />
        </Button>
      </Container>

      <Button
        leftIcon={<GoNorthStar />}
        colorScheme='gray'
        variant='solid'
        maxWidth="12rem"
        mt={{ base: "2", md: "0" }}
        flex={{ base: 'none', md: '1' }}
      >
        Notebook guide
      </Button>
    </Box>
  );
}

export default BottomSearchBar;
