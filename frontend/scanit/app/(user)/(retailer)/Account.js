import React, { useRef } from 'react';
import { View, Text, Button, Box, Heading, Icon, useToast } from 'native-base';
import ContainerStyle from '../../../styles/ContainerStyle';
import Barcode from 'react-native-barcode-svg';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
// import * as Permissions from 'expo-permissions';


// import { shareAsync } from 'expo-sharing';

// import { saveAsAsync } from 'expo-file-system';
// import { Platform, Alert } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

// import * as FileSystem from 'expo-file-system';

import * as ImagePicker from 'expo-image-picker';
import ViewShot from 'react-native-view-shot';
//import { captureScreen } from 'react-native-screenshot';
 
const viewRef = useRef(null);

const Account = () => {
  const toast = useToast();
  const barcodeRef = useRef(null);

  const saveBarcodeImage = async () => {
    const uri = await this.viewShot.capture();


    console.log(uri);

    // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (permission.granted) {
    //   await ImagePicker.saveAsync(imageUri);
    // } else {
    //   console.log('Permission denied');
    // }
  };

    return (
        <View style={ContainerStyle.container}>
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start">Your Account</Heading>
            <Text>&nbsp;</Text>

            <Box rounded={10} shadow={3} alignSelf="center" alignItems="center" padding={10}>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>Retailer barcode:</Text>
            <Text>&nbsp;</Text>
            <ViewShot ref={ref => (this.viewShot = ref)}>
              <Barcode value="123456789011" format="EAN13" />
            </ViewShot>
            {/* <Barcode value="123456789011" format="EAN13" /> */}
            <Text>123456789011</Text>
            <Text>&nbsp;</Text>
            <Button shadow={2} bg={"blue.600"} leftIcon={<Icon as={Ionicons} name="download-outline" size="md"/>}
                 onPress={async () => {
                  await saveBarcodeImage();
                  toast.show({description: "Downloaded PDF!"})
                 }}>
                <Text bold color="white" style={{ fontFamily: 'Rubik-Bold' }}>Download as PDF</Text>
            </Button>
            </Box>
        </View>
    );
}




export default Account;