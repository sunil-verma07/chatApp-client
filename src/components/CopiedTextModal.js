import React,{useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  Flex,
  Textarea,
  Button,
  Spinner  
} from "@chakra-ui/react";
import {useDispatch} from 'react-redux' 
import {addNewNotes} from '../store/actions/fileAction.js';
import {useParams} from 'react-router-dom'

const FileSummary = ({ isOpen, onClose ,title,description}) => {
  const {id} = useParams();
  const [fileName,setFileName] = useState('');
  const [text,setText] = useState('')
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useDispatch()
   

  const addNewFileFunc = 
    async () => {;
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(addNewNotes(fileName,text,id));
        onClose()
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }


  const handleTextUpload = ()=>{
    console.log(fileName,text)
  }


  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          backgroundColor="#282E33"
          p="4"
          w={{base:'50vw',lg:'60vw'}}
          minWidth="320px"
          borderRadius="20px"
          h="60vh"
          m="auto" // Centering the modal
        >
          <ModalHeader color="#B6C2CF" fontSize="24">
            Paste Text
          </ModalHeader>
          <ModalCloseButton
            color="#B6C2CF"
            position="absolute"
            right="4"
            top="4"
          />
          <ModalBody w="full" h="full" display="flex" flexDirection="column" p="4">

            <Flex display="flex" flexDirection="row" alignItems="center" w="full" h="12%">
                <Text color="#B6C2CF" w="15%" minWidth="60px" fontSize={{ base: "14px", md: "16px", lg: "18px",'2xl':"22px" }}>Source Title:</Text>
                <Input onChange={(e)=>setFileName(e.target.value)} value={fileName} color="#fff" placeholder='Enter a title' w="85%" backgroundColor="#161A1D" borderRadius="10px" border="1px solid #38414A" p="2"/>
            </Flex>
            <Textarea onChange={(e)=>setText(e.target.value)} value={text} color="#fff" h="88%" placeholder='Paste text here' backgroundColor="#161A1D" borderRadius="10px" border="1px solid #38414A" p="2" my="2"/>
            <Flex display="flex" flexDirection="row" justifyContent="flex-end" w="full" h="12%">
                <Button color="#282E33" fontSize="18" w="80px" onClick={handleTextUpload} onClick={addNewFileFunc}>{isLoading ? <Spinner color='#282E33' size="sm" />  : 'Upload'}</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileSummary;
