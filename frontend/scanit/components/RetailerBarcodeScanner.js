import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarCodeScanStyle from "../styles/BarCodeScanStyle";
import { Context } from "../GlobalContext";

function RetailerBarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const globalContext = useContext(Context);
  const { domain } = globalContext;

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      // Retailer Auth not implemented yet. Retailer ID with barcode to find the item.
      // const res = await fetch(
      //   `http://${domain}/api/get-item/${retailerId}/${data}`
      // );
      const res = await fetch(`http://${domain}/api/store-get-item/${data}`);
      if (res.ok) {
        const resData = await res.json();
        Alert.alert("Item found", "Please fill in the quantity and expiry.");
        navigation.goBack();
        navigation.navigate("StoreAddItemForm", { itemData: resData });
      } else if (res.status === 400) {
        Alert.alert(
          "Not found",
          "The scanned item was not found in the system. Please fill in the item's data manually."
        );
        navigation.goBack();
        navigation.navigate("StoreAddItemForm", {
          itemData: { barcode: data },
        });
      }
      setScanned(false);
    } catch (error) {
      Alert.alert(
        "Failed",
        "Could not search the system for the scanned item. Please try again."
      );
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return (
      <View style={BarCodeScanStyle.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={BarCodeScanStyle.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={BarCodeScanStyle.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={BarCodeScanStyle.barcodebox}
      />
      <Text>&nbsp;</Text>
      <Text style={BarCodeScanStyle.subtitle}>
        Point your camera at a barcode to ScanIt!
      </Text>
      <Text>&nbsp;</Text>
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
}

export default RetailerBarcodeScanner;
