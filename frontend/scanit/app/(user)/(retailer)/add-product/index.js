import { View, Button, Text, StatusBar } from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

function AddProduct() {
  const router = useRouter();
  const isOnWeb = Platform.OS === "web";

  return (
    <View style={BarCodeScanStyle.container}>
      {isOnWeb ? (
        <Text>
          Scanning is not available on the web app. Please enter the product's
          details manually.
        </Text>
      ) : (
        <Text>
          Scan the product's barcode. If the product already exists in the
          system, details will be loaded. Alternatively, you can enter the
          product's details manually.
        </Text>
      )}
      <Text>&nbsp;</Text>
      {!isOnWeb && (
        <Button
          bg="brand.400"
          onPress={() => router.push("add-product/scanner")}
        >
          Scan barcode
        </Button>
      )}
      <Text>&nbsp;</Text>
      <Button
        variant="outline"
        colorScheme="emerald"
        onPress={() => router.push("add-product/form")}
      >
        <Text color="brand.400">Enter details manually</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

export default AddProduct;
