import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { View, Text, Heading, Flex, StatusBar, Spacer, useColorMode, Button, Box, Icon, useToast,
Divider, SimpleGrid, ScrollView, Center } from 'native-base';
import Barcode from 'react-native-barcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import ThemeButton from '../../../components/ThemeButton';
import LogOutButton from '../../../components/LogOutButtonComponent';

function Account() {
  const colorMode = useColorMode();
  const toast = useToast();
  const barcodeRef = useRef(null);
  const { user, loading } = useAuth();

  const saveBarcodeImage = async () => {
    

    // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (permission.granted) {
    //   await ImagePicker.saveAsync(imageUri);
    // } else {
    //   console.log('Permission denied');
    // }
  };

    return (
      <Box _dark={{ bg: "black" }} flex={1} _light={{ bg: "white" }} safeAreaTop>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      
      
        <Heading size="lg" style={{ fontFamily: "Rubik-Bold" }}
            fontSize={30}
            bold
            justifyContent="flex-start"
            alignSelf={"center"}
            _web={{ mb: "5", mt:"5", mx:"8", alignSelf:"flex-start" }}>
          Account
        </Heading>

        {Platform.OS !== "web" && <Divider
          my="2"
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.500",
          }}
        />}
        <ScrollView mx={8} _android={{mx: 12}} flex={1} showsVerticalScrollIndicator={false}>
        <Text textAlign="center" _web={{textAlign:"start"}}>
          Details about your account are displayed here.
        </Text>
        <Text>&nbsp;</Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={5} spacingY={5} my={4}>
          <Box borderWidth={1} borderColor="gray.200" borderRadius={8} width={310}
          rounded={10} _web={{shadow: 3}} alignItems="center" padding={10}>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>Retailer barcode:</Text>
            <Text>&nbsp;</Text>
            {/* <ViewShot ref={ref => (this.viewShot = ref)}>
              <Barcode value="123456789011" format="EAN13" />
            </ViewShot> */}

            <Barcode value={user.user.retailer_barcode} format="EAN13" />
            <Text>{user.user.retailer_barcode}</Text>
            <Text>&nbsp;</Text>
            <Button shadow={2} bg={"blue.600"} leftIcon={<Icon as={Ionicons} name="download-outline" size="md"/>}
                  onPress={async () => {
                  await saveBarcodeImage();
                  toast.show({description: "Downloaded PDF!"})
                  }}>
                <Text bold color="white" style={{ fontFamily: 'Rubik-Bold' }}>Download as PDF</Text>
            </Button>
          </Box>
          
          {Platform.OS !== "web" &&
            <>
            <Box borderWidth={1} borderColor="gray.200" width={310} borderRadius={8} p={4} marginTop={3}>
              <Box mb={2}>
                <Text bold fontSize={16}>Appearance</Text>
              </Box>
              <Divider my="2" borderColor="gray.200" />
              <Box mt={2} flexDirection="row" justifyContent={"space-between"}>
                <Text>Change theme:</Text>
                <ThemeButton />
              </Box>
              </Box>
              <Box borderWidth={1} borderColor="red.600" width={310} borderRadius={8} p={4} marginTop={6}>
              <Box mb={2}>
                <Text bold fontSize={16} color="red.600">Logout</Text>
              </Box>
              <Divider my="2" bg={"red.600"} />
              <Box mt={2} flexDirection="row" justifyContent={"center"}>
                <LogOutButton />
              </Box>
            </Box>
            </>
          }
        </SimpleGrid>
        </ScrollView>
      </Box>
    );
}




export default Account;
