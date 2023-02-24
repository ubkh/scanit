import { useState, useContext, useEffect } from 'react';
// import {useNavigation} from'@react-navigation/native';
import { useRouter } from 'expo-router';
import { Context } from '../context/GlobalContext';
import { Text, View, Button, Alert, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarCodeScanStyle from '../styles/BarCodeScanStyle';

function BarCodeScanComponent(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not scanned yet");
    //const navigation = useNavigation();
    const router = useRouter();
    const globalContext = useContext(Context);
    //const { basketList } = globalContext;
    const { isRetailerScanned, setIsRetailerScanned } = globalContext;
    const [quantityInput, setQuantityInput] = useState(1);
    // const { retailerBarcodeData, retailerBarcodeType } = globalContext;
    // const { setRetailerBarcodeData, setRetailerBarcodeType } = globalContext;

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
    }
    
      useEffect(() => {
        askForCameraPermission();
      }, []);


      const handleAddItemsPress = (type, data) => {
        if (quantityInput !== "") {
            const quantity = parseInt(quantityInput);
            if (quantity > 0) {
                globalContext.setBasketList([...globalContext.basketList, { 'data': data, 'type': type, 'quantity': quantity }]);
                router.push({ pathname: '/home', params: { data: data, type: type } });
            } else {
                Alert.alert("Invalid quantity", "Please enter a positive integer.");
            }
        } else {
            Alert.alert("No quantity entered", "Please enter a quantity.");
        }
      };

    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
        if (!isRetailerScanned) {
          globalContext.setRetailerScanned(true)
          console.log("Retailer Barcode Scanned!")
          globalContext.setRetailerBarcodeData(data)
          globalContext.setRetailerBarcodeType(type)
        }
        else {
        //   Alert.alert(
        //     'Add Scanned Item',
        //     'How many of this item do you want to add?',
        //     [
        //         {
        //             text: 'Cancel',
        //             onPress: () => {
        //                 console.log("Cancelled item adding")
        //                 router.push({ pathname: '/home' });
        //             },
        //             style: 'cancel',
        //         },
        //         {
        //             text: 'Add items',
        //             onPress: handleAddItemsPress(type, data),
        //             style: 'default',
        //         },
        //     ],
        //     {
        //         component: (
        //             <View>
        //                 <TextInput
        //                     style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        //                     placeholder="Enter quantity"
        //                     keyboardType="numeric"
        //                     value={quantityInput}
        //                     onChangeText={setQuantityInput}
        //                 />
        //             </View>
        //         )
        //     }
        // );

        Alert.prompt(
          'Enter a number',
          null,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: (value) => console.log(`Entered value: ${value}`),
            },
          ],
          'plain-text',
          null,
        );

          globalContext.setBasketList([...globalContext.basketList, { 'data': data, 'type': type }])
        }
        
        //navigation.navigate('HomeScreen', { data, type });
        router.push({ pathname: '/home', params: { data, type } });
      };
    
      if (hasPermission === null) {
        return (
          <View style={BarCodeScanStyle.container}>
            <Text>Requesting for camera permission</Text>
          </View>)
      }

      if (hasPermission === false) {
        return (
          <View style={BarCodeScanStyle.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
          </View>)
      }

      return (
        <View style={BarCodeScanStyle.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={BarCodeScanStyle.barcodebox}
          />
          <Text>&nbsp;</Text>
          <Text style={BarCodeScanStyle.subtitle}> Point your camera at a barcode to ScanIt! </Text>
          <Text>&nbsp;</Text>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
      );
    
}

export default BarCodeScanComponent;