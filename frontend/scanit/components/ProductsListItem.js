import { Box, Text, AlertDialog, Button, HStack } from "native-base";
import { useState, useRef, useContext } from "react";
import { Alert } from "react-native";
import { Context } from "../context/GlobalContext";
// import { Platform } from "react-native";

function ProductsListItem({ item }) {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const suspendAlertCancelRef = useRef(null);
  const globalContext = useContext(Context);
  const { domain } = globalContext;

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
  }

  return (
    <Box borderBottomWidth="1" py="2" borderColor="gray.400">
      <HStack alignItems="center">
        <Text flex={2} maxW="35%" pr="5">
          {item.name}
        </Text>
        <Text flex={1}>Price: £{item.price}</Text>
        <Text flex={1}>Quantity: {item.quantity}</Text>
        <Text flex={1}>Expiry: {item.expiry}</Text>
        <Button variant="outline" colorScheme="emerald" mr="5">
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
        <AlertDialog
          leastDestructiveRef={suspendAlertCancelRef}
          isOpen={isAlertOpen}
          onClose={() => setAlertOpen(false)}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Suspend product</AlertDialog.Header>
            <AlertDialog.Body>
              This will suspend the product, preventing customers from scanning
              it. Are you sure?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setAlertOpen(false)}
                  ref={suspendAlertCancelRef}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    handleSuspend(item.barcode);
                    setAlertOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </HStack>
    </Box>
  );
}
export default ProductsListItem;
