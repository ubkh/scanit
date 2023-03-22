import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';
import { View, Box, HStack, Text, IconButton, Icon, Flex, Divider, useColorMode, Select, CheckIcon } from 'native-base';
import { useAuth } from '../context/AuthContext';
import LogOutButton from "./LogOutButtonComponent";
import ThemeButton from './ThemeButton';
import ScanitLogo from './ScanitLogoComponent';
import { Ionicons } from '@expo/vector-icons';

const NavBarComponent = ({ links }) => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <View>
      <Box safeAreaTop bg="white" _dark={{bg: "black"}}/>
      <HStack
        bg="white"
        _dark={{
          bg: "black",
        }}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        shadow={1}
        flexDirection="row"
        flex={1}
        paddingLeft={20}
        paddingRight={20}
        elevation={4}
        zIndex={4}
        marginBottom={colorMode === 'dark' ? 0 : 1}
        borderBottomColor="muted.700"
        borderBottomWidth={colorMode === 'dark' ? 1 : 0}
      >
        <HStack alignItems="center">
          <ScanitLogo transform={`scale(0.82)`} style={{marginLeft: -60}}/>
        </HStack>
        <HStack alignItems="center">
          <Flex direction="row" h="9" p="2">
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <Text>
                  <Link 
                    href={link.url}
                    style={[link.url.endsWith(pathname) && { fontWeight: 'bold' }]}>
                      {link.label}
                  </Link>
                </Text>
                {index !== links.length - 1 && (
                  <Divider bg="brand.400" thickness="2" mx="2" orientation="vertical" />
                )}
              </React.Fragment>
            ))}
          </Flex>
          <ThemeButton />
          <LogOutButton style={{marginLeft: 10, marginRight: -42}} />
        </HStack>
      </HStack>
    </View>
  );
};

export default NavBarComponent;
