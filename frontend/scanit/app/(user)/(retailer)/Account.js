import React, { useRef } from 'react';
import { View, Text, Heading, Flex, StatusBar, Spacer, useColorMode, Button, Box, Icon, useToast } from 'native-base';
import Barcode from 'react-native-barcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

function Account() {
  const colorMode = useColorMode();
  const toast = useToast();
  const barcodeRef = useRef(null);
  const { user } = useAuth();

  const saveBarcodeImage = async () => {
    

    // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (permission.granted) {
    //   await ImagePicker.saveAsync(imageUri);
    // } else {
    //   console.log('Permission denied');
    // }
  };

    return (
      <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <Flex flex={1} alignItems="center">
            <Spacer />
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Your Account</Heading>
            <Box rounded={10} shadow={3} alignSelf="center" alignItems="center" padding={10}>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>Retailer barcode:</Text>
            <Text>&nbsp;</Text>
            {/* <ViewShot ref={ref => (this.viewShot = ref)}>
              <Barcode value="123456789011" format="EAN13" />
            </ViewShot> */}
            <Barcode value="123456789011" format="EAN13" />
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

            <Spacer />
        </Flex>
        </View>
    );
}




export default Account;