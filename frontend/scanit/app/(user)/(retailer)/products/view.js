import { useRouter } from "expo-router";
import { HStack, Text, VStack, View, Button, Box } from "native-base";
import { useContext, useState } from "react";
import { ProductDataContext } from "../../../../context/RetailerProductContext";
import { Context } from "../../../../context/GlobalContext";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";
import { Alert } from "react-native";
import AlertDialogComponent from "../../../../components/AlertDialog";

export default function ViewProductData() {
  const { productData } = useContext(ProductDataContext);
  const { domain } = useContext(Context);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  async function handleSuspend() {
    const res = await fetch(`http://${domain}/api/retailer/update-product/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcode: productData.barcode,
        expiry: productData.expiry,
        is_suspended: true,
      }),
      credentials: "include",
    });
    if (res.ok) {
      Alert.alert("Success", "Product was suspended successfully.");
    } else {
      Alert.alert("Failed", "Could not suspend the product. Please try again.");
    }
    router.replace("/products");
  }

  async function handleUnsuspend() {
    const res = await fetch(`http://${domain}/api/retailer/update-product/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcode: productData.barcode,
        expiry: productData.expiry,
        is_suspended: false,
      }),
      credentials: "include",
    });
    if (res.ok) {
      Alert.alert("Success", "Product was suspended successfully.");
    } else {
      Alert.alert("Failed", "Could not suspend the product. Please try again.");
    }
    router.replace("/products");
  }

  return (
    <View
      style={BarCodeScanStyle.container}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      <VStack w="100%" px="7" _web={{ px: "30%" }}>
        <Text>Name: {productData.name}</Text>
        <Text>Description: {productData.description}</Text>
        <Text>Price: £{(productData.price / 100).toFixed(2)}</Text>
        <Text>Quantity: {productData.quantity}</Text>
        <Text>Expiry: {productData.expiry}</Text>
        <Text>Created: {productData.created_at}</Text>
        <Text>Last updated at: {productData.updated_at}</Text>
        <Box mt="5">
          <Button
            variant="outline"
            bg="white"
            colorScheme="emerald"
            onPress={() => {
              router.push("/products/edit");
            }}
            mb="2"
          >
            <Text color="brand.400">Edit</Text>
          </Button>
          {productData.is_suspended ? (
            <Button bg="blueGray.600" onPress={() => handleUnsuspend()}>
              Unsuspend
            </Button>
          ) : (
            <Button
              colorScheme="danger"
              onPress={() => setAlertOpen(!isAlertOpen)}
            >
              Suspend
            </Button>
          )}
        </Box>
      </VStack>
      <AlertDialogComponent
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
        onSubmit={() => {
          handleSuspend();
          setAlertOpen(false);
        }}
      />
    </View>
  );
}
