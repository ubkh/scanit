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
      <Button
        onPress={() => router.push("/Scanner")}
        title="Scan barcode"
      ></Button>
      <Button
        containerStyle={{
          width: 200,
          margin: 10,
        }}
        title="Enter details manually"
        type="clear"
        onPress={() => router.push("/Form")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default AddProduct;
