import { HStack, Text, VStack, View } from "native-base";
import { useContext } from "react";
import { ProductDataContext } from "../../../../context/RetailerProductContext";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";

export default function ViewProductData() {
  const { productData } = useContext(ProductDataContext);

  return (
    <View
      style={BarCodeScanStyle.container}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      <VStack>
        <Text>Name: {productData.name}</Text>
        <Text>Description: {productData.description}</Text>
        <Text>Price: {productData.price}</Text>
        <Text>Quantity: {productData.quantity}</Text>
        <Text>Expiry: {productData.expiry}</Text>
        <Text>Created: {productData.created_at}</Text>
        <Text>Last updated at: {productData.updated_at}</Text>
      </VStack>
    </View>
  );
}
