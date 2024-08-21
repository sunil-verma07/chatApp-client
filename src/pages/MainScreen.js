import React,{useState,useEffect} from "react";
import { Flex, Heading, Container, Button } from "@chakra-ui/react";
import "./mainScreen.css";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

const MainScreen = () => {
    const navigate = useNavigate();

  return (
    <Flex backgroundColor="#101214" w="100vw" h="100vh">

       <div class="light x1"></div>
        <div class="light x2"></div>
        <div class="light x3"></div>
        <div class="light x4"></div>
        <div class="light x5"></div>
        <div class="light x6"></div>
        <div class="light x7"></div>
        <div class="light x8"></div>
        <div class="light x9"></div>
      <Flex
        display="flex"
        justifyContent="space-between"
        backgroundColor="#000"
        w="full"
        p="4"
        h="12vh"
        alignItems="center"
        position="absolute"
        zIndex="100"
      >
        <img src={logo} alt="" class="logo" />

        <Button
          borderRadius="5rem"
          p="4"
          w="12rem"
          h="3.5rem"
          fontSize="1.3rem"
          fontWeight="400"
          onClick={()=>navigate('/auth')}
        >
          Try Chat Book
        </Button>
      </Flex>

      <Container display="flex" flexDirection="column" class="main-container" >
        <p id="head1" class="header">
          Do your best
        </p>
        <p id="head2" class="header">
        <TypingEffect/>
        </p>
        <p id="head3" class="header">
        <Button
          borderRadius="5rem"
          p="4"
          w="12rem"
          h="3.5rem"
          fontSize="1.3rem"
          fontWeight="400"
          onClick={()=>navigate('/auth')}
        >
          Try Chat Book
        </Button>
        </p>
        
     
      </Container>
    </Flex>
  );
};

export default MainScreen;


const TypingEffect = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["Creating","Thinking","Learning","Brainstroming"];
  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = 200;
    
    if (isDeleting) {
      typingSpeed = 100;
    }
    
    const timeoutId = setTimeout(() => {
      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else {
        setCharIndex((prevIndex) => prevIndex + (isDeleting ? -1 : 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, wordIndex, words]);


  return (
        <span id="cursor" className={isDeleting ? '' : 'stop-blinking'}>{words[wordIndex].substring(0, charIndex)}</span>
  );
}


