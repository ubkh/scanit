import { useState, useContext, useEffect } from 'react';
import {useNavigation} from'@react-navigation/native';
import { Context } from '../GlobalContext';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarCodeScanStyle from '../styles/BarCodeScanStyle';

function BarCodeScanComponent(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not scanned yet");
    const navigation = useNavigation();
    const globalContext = useContext(Context);
    const { basketList } = globalContext;

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
      }
    
      useEffect(() => {
        askForCameraPermission();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
        const check  = basketList.find(obj => obj.data === data)
        if (check) {
          Alert.alert(
          'Item Already in Basket',
          'This item is already in your basket!',
          [
            {
              text: 'Ok',
              onPress: () => {
                console.log("Ok on dialog was pressed")
                navigation.navigate('HomeScreen', { data, type });
              },
              style: 'default',
            },
          ],)
        }
        else {
          globalContext.setBasketList([...globalContext.basketList, { 'data': data, 'type': type }])
          navigation.navigate('HomeScreen', { data, type });
        }
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