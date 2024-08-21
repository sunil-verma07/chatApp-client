import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    useDisclosure,
} from '@chakra-ui/react'
import SourcesModal from './SourcesModal.js'


export default function NavItem({ icon, title, description, active, navSize }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={"flex-start"}
            mb="4"
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#B6C2CF"}
                    p={3}
                    borderRadius={8}
                    w={navSize === "large" && "100%"}
                >
                    <MenuButton w="100%" onClick={onOpen}>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#101214" : "gray.500"} />
                            <Text fontSize={{ base: '8px', md: '12px', lg: '16px' }} color={active ? "#101214" : "#B6C2CF"} ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                
            </Menu>
            <SourcesModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Flex>
    )
}