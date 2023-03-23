import { View, Button, Text, StatusBar, Heading, Divider, Box, useColorMode } from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { ProductDataContext } from "../../../../context/RetailerProductContext";
import { useContext } from "react";

function AddProduct() {
  const router = useRouter();
  const isOnWeb = Platform.OS === "web";
  const { colorMode } = useColorMode();

  const { setProductData } = useContext(ProductDataContext);
  return (
    <Box _dark={{ bg: "black" }} flex={1} _light={{ bg: "white" }} safeAreaTop>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      
      
        <Heading size="lg" style={{ fontFamily: "Rubik-Bold" }}
            fontSize={30}
            bold
            justifyContent="flex-start"
            alignSelf={"center"}
            _web={{ mb: "5", mt:"5", mx:"8", alignSelf:"flex-start" }}>
          Add a Product
        </Heading>

        {Platform.OS !== "web" && <Divider
          my="2"
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.500",
          }}
        />}
      <View mx="8">
      
      {isOnWeb ? (
        <Text>
          Scanning is not available on the web app. Please enter the product's
          details manually.
        </Text>
      ) : (
        <Text textAlign={"center"}>
          Scan the product's barcode. If the product already exists in the
          system, details will be loaded. Alternatively, you can enter the
          product's details manually.
        </Text>
      )}
      <Text>&nbsp;</Text>
      {!isOnWeb && (
        <Button
          bg="brand.400"
          onPress={() => router.push("addProduct/scanner")}
        >
          Scan barcode
        </Button>
      )}
      <Text>&nbsp;</Text>
      <Button
        _web={{width:"20%"}}
        variant="outline"
        colorScheme="emerald"
        onPress={() => {
          setProductData({});
          router.push("addProduct/form");
        }}
      >
        <Text color="brand.400">Enter details manually</Text>
      </Button>
      </View>
    </Box>
  );
}

export default AddProduct;
