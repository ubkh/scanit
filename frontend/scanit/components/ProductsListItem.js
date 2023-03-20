import { Box, Text, Button, HStack, VStack } from "native-base";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import { Context } from "../context/GlobalContext";
import { useRouter } from "expo-router";
import { ProductDataContext } from "../context/RetailerProductContext";
import { Platform } from "react-native";
import AlertDialogComponent from "./AlertDialog";

function ProductsListItem({ item }) {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const globalContext = useContext(Context);
  const { domain } = globalContext;
  const { setProductData } = useContext(ProductDataContext);
  const router = useRouter();
  const isOnWeb = Platform.OS === "web";

  async function handleSuspend(barcode) {
    const res = await fetch(
      `http://${domain}/api/retailer/set-product-suspended/${barcode}/true`,
      { method: "POST", credentials: "include" }
    );
    if (res.ok) {
      Alert.alert("Success", "Product was suspended successfully.");
    } else {
      Alert.alert("Failed", "Could not suspend the product. Please try again.");
    }
    router.replace("/products");
  }

  async function handleUnsuspend(barcode) {
    const res = await fetch(
      `http://${domain}/api/retailer/set-product-suspended/${barcode}/false`,
      { method: "POST", credentials: "include" }
    );
    if (res.ok) {
      Alert.alert("Success", "Product was unsuspended successfully.");
    } else {
      Alert.alert(
        "Failed",
        "Could not unsuspend the product. Please try again."
      );
    }
    router.replace("/products");
  }

  function getItemTextElements() {
    return (
      <>
        <Text flex={2} _web={{ maxW: "35%" }} pr="5">
          {item.name}
        </Text>
        <Text flex={1}>Price: £{(item.price / 100).toFixed(2)}</Text>
        <Text flex={1}>Quantity: {item.quantity}</Text>
        <Text flex={1}>Expiry: {item.expiry}</Text>
      </>
    );
  }

  function getItemButtons() {
    return (
      <>
        <Button
          bg="brand.400"
          onPress={() => {
            setProductData(item);
            router.push("/products/view");
          }}
          mr="2"
        >
          View
        </Button>
        <Button
          variant="outline"
          bg="white"
          colorScheme="emerald"
          mr="2"
          onPress={() => {
            setProductData(item);
            router.push("/products/edit");
          }}
        >
          <Text color="brand.400">Edit</Text>
        </Button>
        {item.is_suspended ? (
          <Button
            bg="blueGray.600"
            onPress={() => handleUnsuspend(item.barcode)}
          >
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
      </>
    );
  }

  function getWebStyle() {
    return (
      <>
        {getItemTextElements()}
        {getItemButtons()}
      </>
    );
  }

  function getPhoneStyle() {
    return (
      <VStack>
        {getItemTextElements()}
        <HStack mt="2">{getItemButtons()}</HStack>
      </VStack>
    );
  }

  return (
    <Box borderBottomWidth="1" borderColor="gray.400">
      <HStack alignItems="center" w="100%" py="2" px="1">
        {isOnWeb ? getWebStyle() : getPhoneStyle()}
      </HStack>
      <AlertDialogComponent
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
        onSubmit={() => {
          handleSuspend(item.barcode);
          setAlertOpen(false);
        }}
      />
    </Box>
  );
}
export default ProductsListItem;
