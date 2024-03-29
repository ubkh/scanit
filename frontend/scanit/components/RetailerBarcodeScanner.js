import { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import { Text, View, Button } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarCodeScanStyle from "../styles/BarCodeScanStyle";
import { Context } from "../context/GlobalContext";
import { useRouter } from "expo-router";
import { ProductDataContext } from "../context/RetailerProductContext";

function RetailerBarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const globalContext = useContext(Context);
  const { domain, protocol } = globalContext;
  const { setProductData } = useContext(ProductDataContext);

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
        `${protocol}://${domain}/api/retailer/get-product/${data}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const resData = await res.json();
        Alert.alert("Product found", "Please fill in the quantity and expiry.");
        setProductData(resData);
        router.back();
        router.push("/addProduct/form");
      } else if (res.status === 400) {
        Alert.alert(
          "Not found",
          "The scanned product was not found in the system. Please fill in the product's data manually."
        );
        setProductData({ barcode: data });
        router.back();
        router.push("/addProduct/form");
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
