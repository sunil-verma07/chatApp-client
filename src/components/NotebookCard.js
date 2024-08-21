import React from "react";
import {
  Flex,
  Heading,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure

} from "@chakra-ui/react";
import { RxDotsVertical } from "react-icons/rx";
import UpdateTitleModal from '../components/UpdateTitleModal.js';
import { useNavigate } from "react-router-dom";


const NotebookCard = ({item}) => {
  const { isOpen: isRenameModalOpen, onOpen: openRenameModal, onClose: closeRenameModal } = useDisclosure();
  const navigate = useNavigate()

  const formatDate=(date)=>{
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleString('en-US', {
      month: 'long',    // Full month name (e.g., "August")
      day: 'numeric',   // Numeric day of the month (e.g., "17")
      year: 'numeric',  // Full year (e.g., "2024")
      hour12: true,     // 12-hour format (e.g., "PM" or "AM")
    });

    return formattedDate

  }

  return (
    <Container
      border="1px"
      cursor="pointer"
      margin="1rem"
      borderRadius="20px"
      backgroundColor="#2C333A"
      borderColor="#454F59"
      w="15rem"
      h="15rem"
      display="flex"
      alignItems="space-between"
      flexDirection="column"
      p="3"
    >
      <Flex flex="1" display="flex" justifyContent="space-between">
        <Container
          backgroundColor="#000"
          borderRadius="50%"
          w="30px"
          h="30px"
        ></Container>

        <Menu >
          {({ isOpen }) => (
            <>
              <MenuButton
               h="30px"
              >
                <RxDotsVertical size="24" color="#B6C2CF" cursor="pointer" />
              </MenuButton>
              <MenuList
                backgroundColor="rgb(56,65,74)"
                borderRadius="10px"
                color="#fff"
                p="3"
              >
              <MenuItem my="2" onClick={openRenameModal}>Update title</MenuItem>
              <MenuItem my="2">Delete</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      <Flex flex="2" flexDirection="column" justifyContent="space-between">
        <Heading color="#fff" fontSize="1.5rem" w="10rem" onClick={()=>navigate(`/notebook/${item?._id}`)}>
          {item?.title}
        </Heading>
        <Heading color="#fff" fontSize="0.8rem" w="10rem">
          {formatDate(item?.createdAt)} . {item?.sources?.length} Sources
        </Heading>
      </Flex>
      <UpdateTitleModal isOpen={isRenameModalOpen} onOpen={openRenameModal} onClose={closeRenameModal}/>
    </Container>
  );
};

export default NotebookCard;
