import React,{useCallback,useState,useEffect} from 'react';
import {
  Flex,
  IconButton,
  Box,
  useDisclosure
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
} from 'react-icons/fi';
import NavItem from '../components/NavItem';
import { MdLibraryAdd } from "react-icons/md";
import SideBarItem from './SideBarItem.js'
import { BsFileEarmarkPdf } from "react-icons/bs";
import {useDispatch,useSelector} from 'react-redux'
import {getAllFiles} from '../store/actions/fileAction.js';
import { TiDocumentText } from "react-icons/ti";
import { BsFiletypeDocx } from "react-icons/bs";
import { useParams } from "react-router-dom";

export default function Sidebar({ isOpen, onToggle }) {

  const [isLoading,setIsLoading]= useState(false);
  const [error,setError] = useState(null);
  const dispatch = useDispatch()
  const {files} = useSelector(state=>state.files)
  const { id } = useParams();


  const loadFilesData = useCallback(async () => {
    setError(null);
    try {
      await dispatch(getAllFiles(id));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);


  useEffect(() => {
    setIsLoading(true);
    loadFilesData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadFilesData]);

  return (
    <Box
      pos="sticky"
      left="2"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={isOpen ? "30px" : "15px"}
      w={isOpen ? '300px' : "60px"}
      transition="width 0.3s ease"
      backgroundColor="#1D2125"
      overflowY={isOpen ? "auto" : "none"}
    >
      <Flex
        p={isOpen ? "5%" : "10%"}
        flexDir="column"
        w="100%"
        alignItems={"flex-start" }
        as="nav"
      >
        <IconButton
          background="none"
          color="#B6C2CF"
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={onToggle}
        />
        <NavItem navSize={isOpen ? "large" : "small"} icon={MdLibraryAdd} title="Add Sources" />

        {files?.map((file)=>(
          <SideBarItem key={file?._id} id={file?._id} navSize={isOpen ? "large" : "small"} icon={file?.fileType === '.pdf' ? BsFileEarmarkPdf : file?.fileType === '.docx' ? BsFiletypeDocx : TiDocumentText } 
          iconColor={file?.fileType === '.pdf' ? '#da2d2a' : file?.fileType === '.docx' ? '#3173ff' : '#ffd331' } title={file?.fileName + file?.fileType}  description={file.extractedText}/>
        ))}

        
        
      </Flex>
    </Box>
  );
}
