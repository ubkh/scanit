import { Box, Text, Button, HStack, VStack } from "native-base";
import { useContext } from "react";
import { useRouter } from "expo-router";
import { ProductDataContext } from "../context/RetailerProductContext";
import { Platform } from "react-native";

function ProductsListItem({ item }) {
  const { setProductData } = useContext(ProductDataContext);
  const router = useRouter();
  const isOnWeb = Platform.OS === "web";

  function getItemTextElements() {
    return (
      <>
        <Text flex={2} _web={{ maxW: "35%" }} pr="5">
          {item.name}
          {item.is_suspended && (
            <Text color="orange.600" flex={1} fontWeight="semibold" ml={2}>
              [Suspended]
            </Text>
          )}
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
    </Box>
  );
}
export default ProductsListItem;
