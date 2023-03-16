import React from 'react';
import { Link, usePathname, useRouter } from 'expo-router';
import { View, Box, HStack, Text, IconButton, Icon, Flex, Divider, useColorMode } from 'native-base';
import { useAuth } from '../context/AuthContext';
import LogOutButton from "./LogOutButtonComponent";
import ThemeButton from './ThemeButton';
import ScanitLogo from './ScanitLogoComponent';

const NavBarComponent = ({ links, isSmallScreen }) => {
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
        marginBottom={colorMode === 'dark' ? 0 : 1} // temporary fix - need better solution
        borderBottomColor="muted.700"
        borderBottomWidth={colorMode === 'dark' ? 1 : 0}
      >
        <HStack alignItems="center">
          {/* <Text color="brand.400" fontSize="20" fontWeight="bold">
            ScanIt
          </Text> */}
          <ScanitLogo transform={`scale(0.82)`}/>
        </HStack>
        {isSmallScreen ? (
          <HStack alignItems="center">
            {/* This doesn't do anything yet, just an icon! Maybe add drawer functionality here? */}
            <IconButton
              icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />}
            />
          </HStack>
        ) : (
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
            <LogOutButton style={{marginLeft: 10}} />
          </HStack>
        )}
      </HStack>
    </View>
  );
};

export default NavBarComponent;
