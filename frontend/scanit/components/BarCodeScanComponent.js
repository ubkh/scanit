// import { useState, useContext, useEffect } from "react";
// import { useRouter } from "expo-router";
// import { Context } from "../context/GlobalContext";
// import { Alert, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Text, View, Button } from "native-base";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import BarCodeScanStyle from "../styles/BarCodeScanStyle";

// function BarCodeScanComponent(props) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [text, setText] = useState("Not scanned yet");
//   //const navigation = useNavigation();
//   const router = useRouter();
//   const globalContext = useContext(Context);
//   //const { basketList } = globalContext;
//   const { isRetailerScanned, setRetailerScanned } = globalContext;
//   const [quantityInput, setQuantityInput] = useState(1);
//   // const { retailerBarcodeData, retailerBarcodeType } = globalContext;
//   // const { setRetailerBarcodeData, setRetailerBarcodeType } = globalContext;

//   const askForCameraPermission = () => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   };

//   useEffect(() => {
//     askForCameraPermission();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setText(data);
//     console.log("Type: " + type + "\nData: " + data);
//     if (!isRetailerScanned) {
//       globalContext.setRetailerScanned(true);
//       console.log("Retailer Barcode Scanned!");
//       globalContext.setRetailerBarcodeData(data);
//       globalContext.setRetailerBarcodeType(type);
//     } else {
//       let foundObject = null;
//       let index = 0;

//       for (let i = 0; i < globalContext.basketList.length; i++) {
//         const obj = globalContext.basketList[i];
//         if (obj.type === type && obj.data === data) {
//           foundObject = obj;
//           index = i;
//           break;
//         }

//         //navigation.navigate('HomeScreen', { data, type });
//         router.push({ pathname: "/home", params: { data, type } });
//       }

//       if (hasPermission === null) {
//         return (
//           <View style={BarCodeScanStyle.container}>
//             <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20 }}>
//               Requesting for camera permission
//             </Text>
//           </View>
//         );
//       }

//       if (hasPermission === false) {
//         return (
//           <View style={BarCodeScanStyle.container}>
//             <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20 }}>
//               No access to camera!
//             </Text>
//             <Text
//               style={{
//                 margin: 15,
//                 fontWeight: "bold",
//                 fontSize: 20,
//                 textAlign: "center",
//               }}
//             >
//               Camera permission is needed to scan barcodes!
//             </Text>
//             {/* <Button shadow={5} title='Allow Camera' onPress={() => askForCameraPermission()} bg="brand.400">
//               <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>
//                 Allow Camera Access
//               </Text>
//             </Button> */}
//             <View style={{ alignItems: "center" }}>
//               <TouchableOpacity onPress={() => askForCameraPermission()}>
//                 <View
//                   style={{
//                     backgroundColor: "#34d399",
//                     borderRadius: 20,
//                     padding: 10,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexDirection: "row",
//                   }}
//                 >
//                   <Ionicons
//                     name="camera"
//                     size={25}
//                     color="white"
//                     marginRight={5}
//                   />
//                   <Text
//                     style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
//                   >
//                     Allow Camera Access
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         );
//       }
//     }

//     //navigation.navigate('HomeScreen', { data, type });
//     router.push({ pathname: "/home", params: { data, type } });
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={BarCodeScanStyle.container}>
//         <Text>Requesting for camera permission</Text>
//       </View>
//     );
//   }

//   useEffect(() => {
//     askForCameraPermission();
//   }, []);

//   if (hasPermission === null) {
//     return (
//       <View style={BarCodeScanStyle.container}>
//         <Text>Requesting for camera permission</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={BarCodeScanStyle.container}>
//         <Text style={{ margin: 10 }}>No access to camera</Text>
//         <Button
//           title={"Allow Camera"}
//           onPress={() => askForCameraPermission()}
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={BarCodeScanStyle.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={BarCodeScanStyle.barcodebox}
//       />
//       <Text>&nbsp;</Text>
//       <Text style={BarCodeScanStyle.subtitle}>
//         {" "}
//         Point your camera at a barcode to ScanIt!{" "}
//       </Text>
//       <Text>&nbsp;</Text>
//       {scanned && (
//         <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//       )}
//     </View>
//   );
// }

// export default BarCodeScanComponent;

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
    //const navigation = useNavigation();
    const router = useRouter();
    const globalContext = useContext(Context);
    //const { basketList } = globalContext;
    const { isRetailerScanned, setRetailerScanned } = globalContext;
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

    
      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data);

        // STORE BARCODE SCANNING
        if (!isRetailerScanned) {
          try {
            const response = await fetch(`http://${globalContext.domain}/api/stores-by-barcode/?barcode=${data}`, {
              method: "GET",
            });

            const resultList = await response.json();
            console.log(resultList);

            if (resultList.length === 0) {
              Alert.alert(
                'Barcode not recognised!',
                'Please try again\n\nEnsure the barcode is correct and you have a stable connection',
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
            } else {
              globalContext.setRetailerScanned(true);
              console.log("Retailer Barcode Scanned!");
              globalContext.setRetailerBarcodeData(resultList);
              globalContext.setRetailerBarcodeType(type);
            }
          } catch (error) {
            console.error(error);
          }
        }

        // PRODUCT SCANNING
        else { 
          let foundObject = null
          let index = 0

          for (let i = 0; i < globalContext.basketList.length; i++) {
            const obj = globalContext.basketList[i];
            if (obj.type === type && obj.data === data) {
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
                    console.log("User acknowledged warning")
                  },
                  style: 'default',
                },
              ],
            )
          } 
          else {
              globalContext.setBasketList([...globalContext.basketList, { 'data': data, 'type': type, 'quantity': 1 }])
              // Wanted to have an alert display if 'doneFirstScan' if false to let the user know
              // that they need to go to the basket to edit quantities, but the alert was causing
              // the app to crash, works above though...
          }
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


