import React, { useCallback, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input ,
  ModalBody,
  ModalCloseButton,
  Avatar
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addNewFile } from "../store/actions/fileAction.js";



const SourcesModal = ({ isOpen, onOpen, onClose }) => {

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const addNewFileFunc = 
    async (event) => {
      const file = event.target.files[0];
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(addNewFile(file));
        onClose()
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          backgroundColor="#1D2125"
          p="4"
          w={{ base: "200px", lg: "20vw" }} // Adjusted width to be more responsive
          maxW="300px" // Set a max width for larger screens
          borderRadius="20px"
          h="40vh"
          m="auto" // Centering the modal
        >
       
          <ModalCloseButton
            color="#B6C2CF"
            position="absolute"
            right="4"
            top="4"
          />
          <ModalBody display="flex" justifyContent="center" alignItems="center" h="full" flexDirection="column">
            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' w="200px" h="200px"/>

            <Input placeholder='Basic usage' />


          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SourcesModal;
