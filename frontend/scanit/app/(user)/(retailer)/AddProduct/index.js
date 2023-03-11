import { View, Button, Text, StatusBar } from "native-base";
import ContainerStyle from "../../../../styles/ContainerStyle";
import { useRouter } from "expo-router";
// import { useContext } from "react";
// import { Context } from "../../../../context/GlobalContext";

function AddProduct() {
  //   const globalContext = useContext(Context);
  const router = useRouter();

  return (
    <View style={ContainerStyle.container}>
      <Text>
        Scan the product's barcode. If the product already exists in the system,
        details will be loaded. Alternatively, you can enter the product's
        details manually.
      </Text>
      <Text>&nbsp;</Text>
      <Button bg="brand.400" onPress={() => router.push("AddProduct/Scanner")}>
        Scan barcode
      </Button>
      <Text>&nbsp;</Text>
      <Button
        variant="outline"
        colorScheme="emerald"
        onPress={() => router.push("AddProduct/Form")}
      >
        <Text color="brand.400">Enter details manually</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

export default AddProduct;
