import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Container,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegFilePdf } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { GrCopy } from "react-icons/gr";
import { MdAddToDrive } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addNewFile } from "../store/actions/fileAction.js";
import { BsFiletypeDocx } from "react-icons/bs";
import CopiedTextModal from "./CopiedTextModal.js";
import { useParams } from "react-router-dom";
// import UploadFromDrive from '../utils/uploadFromDrive.js';

const SourcesModal = ({ isOpen, onOpen, onClose }) => {
  const {
    isOpen: isTextModalOpen,
    onOpen: openTextModal,
    onClose: closeTextModal,
  } = useDisclosure();

  const { id } = useParams();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const addNewFileFunc = async (event) => {
    const file = event.target.files[0];
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(addNewFile(file, id));
      onClose();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

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
          <ModalHeader color="#B6C2CF" fontSize="24">
            Upload From
          </ModalHeader>
          <ModalCloseButton
            color="#B6C2CF"
            position="absolute"
            right="4"
            top="4"
          />
          <ModalBody>
            <Container
              display="flex"
              alignItems="center"
              margin="2"
              marginTop="4"
              position="relative"
              cursor="pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf" // Ensure this line is uncommented and set correctly
                onChange={addNewFileFunc}
              />
              <button
                onClick={handleButtonClick}
                style={{ width: "100%", position: "absolute", height: "20px" }}
              ></button>
              <FaRegFilePdf color="#B6C2CF" size="20" />
              <Text
                fontSize={{ base: "12px", md: "13px", lg: "16px" }}
                color="#B6C2CF"
                marginLeft="6"
              >
                PDF File
              </Text>
            </Container>

            <Container
              display="flex"
              alignItems="center"
              margin="2"
              marginTop="4"
              position="relative"
              cursor="pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".docx"
                onChange={addNewFileFunc}
              />
              <button
                onClick={handleButtonClick}
                style={{ width: "100%", position: "absolute", height: "20px" }}
              ></button>
              <BsFiletypeDocx color="#B6C2CF" size="20" />
              <Text
                fontSize={{ base: "12px", md: "13px", lg: "16px" }}
                color="#B6C2CF"
                marginLeft="6"
              >
                Doc File
              </Text>
            </Container>

            <Container
              display="flex"
              alignItems="center"
              margin="2"
              marginTop="4"
              cursor="pointer"
              position="relative"
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".txt"
                onChange={addNewFileFunc}
              />
              <button
                onClick={handleButtonClick}
                style={{ width: "100%", position: "absolute", height: "20px" }}
              ></button>
              <TiDocumentText color="#B6C2CF" size="20" />
              <Text
                fontSize={{ base: "12px", md: "13px", lg: "16px" }}
                color="#B6C2CF"
                marginLeft="6"
              >
                Text File
              </Text>
            </Container>

            <Container
              display="flex"
              alignItems="center"
              margin="2"
              marginTop="4"
              position="relative"
              onClick={openTextModal}
              cursor="pointer"
            >
              <GrCopy color="#B6C2CF" size="20" />
              <Text
                fontSize={{ base: "12px", md: "13px", lg: "16px" }}
                color="#B6C2CF"
                marginLeft="6"
              >
                Copied Text
              </Text>
            </Container>

            <Container
              display="flex"
              alignItems="center"
              margin="2"
              marginTop="4"
              position="relative"
              cursor="pointer"
            >
              <MdAddToDrive color="#B6C2CF" size="20" />
              <Text
                fontSize={{ base: "12px", md: "13px", lg: "16px" }}
                color="#B6C2CF"
                marginLeft="6"
              >
                Drive
              </Text>
            </Container>

            {/* <UploadFromDrive/> */}
          </ModalBody>
        </ModalContent>
        <CopiedTextModal isOpen={isTextModalOpen} onClose={closeTextModal} />
      </Modal>
    </>
  );
};

export default SourcesModal;
