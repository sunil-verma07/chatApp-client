import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  chakra,
  Box,
  Heading,
  Skeleton,
  Stack,
  Flex
} from "@chakra-ui/react";

import { BsStars } from "react-icons/bs";
import { summarizeText } from "../store/actions/fileAction.js";
import { useDispatch, useSelector } from "react-redux";

const StyledBox = chakra(Box, {
  baseStyle: {
    overflowY: "scroll",
    height: "200px",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#9FADBC",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    "&::-webkit-scrollbar-corner": {
      background: "#f1f1f1",
    },
  },
});

const FileSummary = ({ isOpen, onClose, title, description, id }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { suggestedQuestions, textSummary } = useSelector(
    (state) => state.files
  );

  const getSummaryAndQuestions = async () => {
    setError(null);
    try {
      await dispatch(summarizeText(id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getSummaryAndQuestions().then(() => setIsLoading(false));
    }
  }, [isOpen, dispatch]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          backgroundColor="#1D2125"
          p="4"
          w={{ base: "70vw", lg: "80vw" }} // Adjusted width to be more responsive
          borderRadius="20px"
          h="80vh"
          m="auto" // Centering the modal
        >
          <ModalHeader color="#B6C2CF" fontSize="24">
            {title}
          </ModalHeader>
          <ModalCloseButton
            color="#B6C2CF"
            position="absolute"
            right="4"
            top="4"
          />
          <ModalBody w="full" h="full">
            <StyledBox
              display="flex"
              w="full"
              flexDirection="row"
              h="full"
              p="8"
              flexWrap="wrap"
            >
              <StyledBox
                flex="1"
                backgroundColor="rgba(204,224,255,0.3)"
                h="full"
                p="8"
                overflowY="auto"
                color="#85B8FF"
                minWidth="600px"
                borderRadius="20px"
              >
                <Heading
                  display="flex"
                  alignItems="center"
                  fontSize="24"
                  fontWeight="semibold"
                >
                  <BsStars color="#85B8FF" />
                  <Text color="#85B8FF"> Source Guide</Text>
                </Heading>
                <Heading
                  display="flex"
                  alignItems="center"
                  fontSize="20"
                  fontWeight="semibold"
                >
                  <Text color="#85B8FF" my="4">
                    Summary
                  </Text>
                </Heading>

                {isLoading ? <Stack w="100%">
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="60%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="40%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                  <Skeleton
                    height="20px"
                    w="100%"
                    startColor="rgba(204,224,255,0.5)"
                    endColor="rgba(204,224,255,0.2)"
                  />
                </Stack> : <> <Text>{textSummary}</Text>
                <Heading
                display="flex"
                alignItems="center"
                fontSize="20"
                fontWeight="semibold"
              >
                <Text color="#85B8FF" my="4">
                  Suggested Questions
                </Text>
              </Heading>

              <Box display="inline">
              <Text backgroundColor="rgba(204,224,255,0.2)" borderRadius="30px" p="2" my="2" w="full">{suggestedQuestions.question1}</Text>              
              <Text backgroundColor="rgba(204,224,255,0.2)" borderRadius="30px" p="2" my="2" w="full">{suggestedQuestions.question2}</Text>              

              <Text backgroundColor="rgba(204,224,255,0.2)" borderRadius="30px" p="2" my="2" w="full">{suggestedQuestions.question3}</Text>              

              <Text backgroundColor="rgba(204,224,255,0.2)" borderRadius="30px" p="2" my="2" w="full">{suggestedQuestions.question4}</Text>              

              <Text backgroundColor="rgba(204,224,255,0.2)" borderRadius="30px" p="2" my="2" w="full">{suggestedQuestions.question5}</Text>              
              </Box>
              </>
                }
              </StyledBox>

              <StyledBox
                flex="1"
                h="full"
                p="8"
                overflowY="auto"
                color="#fff"
                minWidth="600px"
              >
                {description}
              </StyledBox>
            </StyledBox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileSummary;
