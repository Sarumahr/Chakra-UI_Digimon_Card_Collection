import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Link
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { MainDrawer } from "./MainDrawer";

export function HeaderMenu() {
  return (
    <Flex>
      <MainDrawer />
      <Spacer />
      <Box justifySelf="flex-end">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Menu placement="right-start">
          <MenuButton>
            <Avatar size="sm" justifySelf="flex-end" bg="teal.500" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link href="login">Login</Link>
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
