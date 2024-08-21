import React, { useState } from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  useDisclosure,
  Checkbox,
  MenuList,
  MenuItem,

} from "@chakra-ui/react";
import FileSummaryDrawer from "./FileSummaryDrawer.js";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { removeFile } from "../store/actions/fileAction.js";

const SideBarItem = ({
  id,
  icon,
  title,
  description,
  active,
  navSize,
  iconColor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const truncateText = (text) => {
    let maxLength = 14;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const removeFileFunc = async (event) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(removeFile(id));
      onClose();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Flex flexDir="column" ml={4} my="4" w="90%" alignItems={"flex-start"}>
      <Menu placement="right">
        <Link
          backgroundColor={active && "#B6C2CF"}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={8}
          w={navSize === "large" && "100%"}
        >
          <Menu>
            <MenuButton>
              <HiDotsVertical color="#B6C2CF" size="26" />
            </MenuButton>
            <MenuList
              backgroundColor="rgb(56,65,74)"
              borderRadius="10px"
              color="#fff"
              p="3"
            >
              <MenuItem my="2" onClick={removeFileFunc}>
                Remove Source
              </MenuItem>
            </MenuList>
          </Menu>

          <MenuButton w="100%" onClick={onOpen}>
            <Flex>
              <Icon color={iconColor} as={icon} fontSize="xl" />
              <Text
                ml="1"
                color={active ? "#101214" : "#B6C2CF"}
                textAlign="left"
                display={navSize === "small" ? "none" : "flex"}
                fontSize={{ base: "8px", md: "12px", lg: "16px" }}
              >
                {truncateText(title)}
              </Text>
            </Flex>
          </MenuButton>

        </Link>

      </Menu>
      <FileSummaryDrawer
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
        id={id}
      />
    </Flex>
  );
};

export default SideBarItem;
