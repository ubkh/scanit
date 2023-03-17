import { useState, useEffect, useContext } from "react";
import { Text, View, Button, Alert } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarCodeScanStyle from "../styles/BarCodeScanStyle";
import { Context } from "../context/GlobalContext";
import { useRouter } from "expo-router";

function RetailerBarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
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
      const res = await fetch(
        `http://${domain}/api/retailer/get-product/${data}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const resData = await res.json();
        Alert.alert("Product found", "Please fill in the quantity and expiry.");
        router.back();
        router.push({ pathname: "/Form", params: { productData: resData } });
      } else if (res.status === 400) {
        Alert.alert(
          "Not found",
          "The scanned product was not found in the system. Please fill in the product's data manually."
        );
        router.back();
        router.push({
          pathname: "/Form",
          params: { productData: { barcode: data } },
        });
      }
      setScanned(false);
    } catch (error) {
      Alert.alert(
        "Failed",
        "Could not search the system for the scanned product. Please try again."
      );
      router.back();
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
    </View>
  );
}

export default RetailerBarcodeScanner;
