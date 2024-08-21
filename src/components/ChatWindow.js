import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Container, chakra, Box } from '@chakra-ui/react';
import ChatComponent from './ChatComponent.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQueries } from '../store/actions/chatAction.js';

const StyledBox = chakra(Box, {
    baseStyle: {
        overflowY: 'scroll',
        height: '200px',
        '&::-webkit-scrollbar': {
            width: '0px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#9FADBC',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
        '&::-webkit-scrollbar-corner': {
            background: '#f1f1f1',
        },
    },
});

const ChatWindow = () => {
    const { id } = useParams();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { chats, isTyping } = useSelector(state => state.chats);
    const endOfChatRef = useRef(null);

    useEffect(() => {
        if (endOfChatRef.current) {
            endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    const loadQueriesData = useCallback(async () => {
        setError(null);
        try {
            await dispatch(getAllQueries(id));
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, id]);

    useEffect(() => {
        setIsLoading(true);
        loadQueriesData().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadQueriesData]);

    // Find the index of the last message with a null response
    const lastMessageIndex = chats.length - 1;
    const isLastMessagePending = chats[lastMessageIndex]?.response === null;

    return (
        <StyledBox w={{ base: '95vw', md: '90vw', lg: '80vw', xl: '80vw' }} h={{ base: "65vh", md: "70vh", lg: "60vh" }} mt="15vh" backgroundColor="#101214" overflowY="auto" color="#fff">
            {chats?.map((item, index) => (
                <React.Fragment key={item._id}>
                    <ChatComponent from="user" text={item?.query} />
                    <ChatComponent 
                        from="bot" 
                        isTyping={index === lastMessageIndex && isTyping && isLastMessagePending} 
                        text={item?.response}
                    />
                </React.Fragment>
            ))}
            <div ref={endOfChatRef} style={{ paddingBottom: '20px' }} />
        </StyledBox>
    );
}

export default ChatWindow;
