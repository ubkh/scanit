import React from 'react';
import { Link, usePathname } from 'expo-router';
import { View, Box, HStack, Text, IconButton, Icon, Flex, Divider, Button } from 'native-base';

const NavBarComponent = ({ links, isSmallScreen }) => {
  const pathname = usePathname();
  
  return (
    <View>
      <Box safeAreaTop bg="white" />
      <HStack
        bg="white"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        shadow={1}
        flexDirection="row"
        flex={1}
        paddingLeft={20}
        paddingRight={20}
        marginBottom={1}
      >
        <HStack alignItems="center">
          <Text color="brand.400" fontSize="20" fontWeight="bold">
            ScanIt
          </Text>
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
                  <Link 
                    href={link.url}
                    style={[pathname === link.url && { fontWeight: 'bold' }]}>
                      {link.label}
                  </Link>
                  {index !== links.length - 1 && (
                    <Divider bg="brand.400" thickness="2" mx="2" orientation="vertical" />
                  )}
                </React.Fragment>
              ))}
            </Flex>
            <Button
              shadow={2}
              bg="brand.400"
              ml="2"
              marginLeft={10}
              onPress={() => console.log('hello world')}
            >
              Login
            </Button>
          </HStack>
        )}
      </HStack>
    </View>
  );
};

export default NavBarComponent;
