import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Context } from '../context/GlobalContext';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Button } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarCodeScanStyle from '../styles/BarCodeScanStyle';

function BarCodeScanComponent(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not scanned yet");
    const router = useRouter();
    const globalContext = useContext(Context);
    const { isRetailerScanned } = globalContext;
    const{quantityValue, setQuantityValue} = globalContext;

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
    }
    
      useEffect(() => {
        askForCameraPermission();
      }, []);

    
      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setText(data);

        // This executes after recognising a barcode, we decide what to do with
        // the data

        // STORE BARCODE SCANNING
        if (!isRetailerScanned) {
          try {
            // AWAIT THE RESPONSE SO WE DON'T CONTINUE WITHOUT THIS
            const response = await fetch(`http://${globalContext.domain}/api/stores-by-barcode/?barcode=${data}`,
            {
              method: "GET",
            });

            // AWAIT THE RESPONSE TO AVOID UNDEFINED ERRORS
            const storeList = await response.json();
            console.log(storeList);

            // WORK ON THE RESPONSE
            if (storeList.length === 0) {
              globalContext.setRetailerScanned(false);
              Alert.alert(
                'Barcode not recognised!',
                'Please try again\n\nEnsure the barcode is correct and you have a stable connection',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                    },
                    style: 'default',
                  },
                ],
              );
            } else {
              globalContext.setRetailerScanned(true);
              console.log("Retailer Barcode Scanned!");
              globalContext.setRetailerBarcodeData(storeList);
              globalContext.setRetailerBarcodeType(type);
            }
          } catch (error) {
            console.error(error);
          }
        }

        // PRODUCT SCANNING
        else {
          try {

            // AWAIT THE RESPONSE SO WE DON'T CONTINUE WITHOUT THIS
            const response = await fetch(
              `http://${globalContext.domain}/api/check-product/?barcode=${data}&store_barcode=${globalContext.retailerBarcodeData[0].barcode}`,
            {
              method: "GET",
            }
            );

            // AWAIT THE RESPONSE TO AVOID UNDEFINED ERRORS
            const productList = await response.json();

            if (productList.length === 0) {
              Alert.alert(
                'Barcode not recognised!',
                'Please try again\n\nEnsure the barcode is correct and you have a stable connection\n\nPlease ensure the product is sold at this store!',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      console.log("User acknowledged warning");
                    },
                    style: 'default',
                  },
                ],
              );
            }
            else {
              let foundObject = null
              let index = 0

              for (let i = 0; i < globalContext.basketList.length; i++) {
                const obj = globalContext.basketList[i];
                if (obj.barcode === data) {
                  foundObject = obj;
                  index = i
                  break;
                }
              }

              if (foundObject) {
                Alert.alert(
                  'Item already in basket',
                  'Adjust the quantity in the basket!',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                      },
                      style: 'default',
                    },
                  ],
                )
                setQuantityValue(1);
              } 
              else {
                  globalContext.setBasketList([...globalContext.basketList, {'name': productList[0].name, 'barcode': data, 'quantity': quantityValue, 'price': parseInt(productList[0].price) }])
                  Alert.alert('Item Scanned', 'Check basket to change quantity');
                  setQuantityValue(1);
              }
            }            
        }
        catch (error) {
          console.error(error);
        }
          
        }

        //navigation.navigate('HomeScreen', { data, type });
        router.push({ pathname: '/home', params: { data, type } });
      };
    
      if (hasPermission === null) {
        return (
          <View style={BarCodeScanStyle.container}>
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20 }}>Requesting for camera permission</Text>
          </View>)
      }

      if (hasPermission === false) {
        return (
          
          <View style={BarCodeScanStyle.container}>
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20 }}>
              No access to camera!
            </Text>
            <Text
              style={{
                margin: 15,
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Camera permission is needed to scan barcodes!
            </Text>
            {/* <Button shadow={5} title='Allow Camera' onPress={() => askForCameraPermission()} bg="brand.400">
              <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>
                Allow Camera Access
              </Text>
            </Button> */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => askForCameraPermission()}>
                <View
                  style={{
                    backgroundColor: "#34d399",
                    borderRadius: 20,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="camera"
                    size={25}
                    color="white"
                    marginRight={5}
                  />
                  <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
                    Allow Camera Access
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          )
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
          {scanned && 
          <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => askForCameraPermission()}>
                <View
                  style={{
                    backgroundColor: "#34d399",
                    borderRadius: 20,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="camera"
                    size={25}
                    color="white"
                    marginRight={5}
                  />
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                  >
                    Tap to Scan Again!
                  </Text>
                </View>
              </TouchableOpacity>
            </View>}
        </View>
      );
    
}

export default BarCodeScanComponent;


