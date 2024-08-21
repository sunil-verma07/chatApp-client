import React,{useState,useCallback,useEffect} from 'react'
import { Flex ,Heading,Container } from '@chakra-ui/react'
import NotebookCard from '../components/NotebookCard.js'
import NewNotebookCard from '../components/NewNotebookCard.js'
import {useDispatch,useSelector} from 'react-redux'
import {getAllNotebooks} from '../store/actions/notebookAction.js'

const LandingScreen = () => {
  const [isLoading,setIsLoading]= useState(false);
  const [error,setError] = useState(null);
  const dispatch = useDispatch()
  const {notebooks} = useSelector(state=>state.notebook)

  const loadNotebooksData = useCallback(async () => {
    setError(null);
    try {
      await dispatch(getAllNotebooks());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setError]);


  useEffect(() => {
    setIsLoading(true);
    loadNotebooksData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNotebooksData]);

  return (
    <Flex w="100%" h="full" minHeight="100vh" display="flex" flexDir="row">
    <Flex flex="1"  backgroundColor="#101214">
    </Flex>

    <Flex flex="5" backgroundColor="#101214" display="flex" flexDirection="column" paddingTop="20vh">
    <Heading color="#fff" fontSize="2rem">Notebooks</Heading>

    <Container display="flex" flexWrap="wrap">
        <NewNotebookCard/>
        {notebooks?.map((item)=>(<NotebookCard key={item?._id} item={item}/>))
        }

    </Container>
  
    </Flex>
  </Flex>
  )
}

export default LandingScreen