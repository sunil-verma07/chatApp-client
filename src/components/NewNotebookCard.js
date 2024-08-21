import React,{useState,useCallback,useEffect} from "react";
import { Flex, Heading, Container } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {addNewNotebook} from '../store/actions/notebookAction.js';

const NewNotebookCard = () => {

  const [isLoading,setIsLoading]= useState(false);
  const [error,setError] = useState(null);
  const dispatch = useDispatch()


  const addNotebookHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(addNewNotebook());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

    return (
    <Container
      border="1px"
      borderRadius="20px"
      borderColor="#454F59"
      w="15rem"
      h="15rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="3"
      margin="1rem"
      cursor="pointer"
      onClick={addNotebookHandler}
    >
      <Flex flex="1" display="flex" justifyContent="space-between"></Flex>

      <Flex
        flex="2"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
      >
        <FaPlus size="40" color="#B6C2CF" cursor="pointer" />
        <Heading color="#fff" fontSize="1.5rem" marginTop="1rem">
          New Notebook
        </Heading>
      </Flex>
    </Container>
  );
};

export default NewNotebookCard;
