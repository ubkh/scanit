import {
  View,
  Text,
  Button,
  Box,
  Heading,
  StatusBar,
  Center,
  Icon,
} from "native-base";
import {
  Container,
  Header,
  Title,
  Body,
  Flex,
  Spacer,
  Divider,
  useColorMode,
} from "native-base";
import { Link, useRouter, useSearchParams } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Alert, Platform } from "react-native";
import { Context } from "../../../../context/GlobalContext";
import { useAuth } from "../../../../context/AuthContext";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

function Home() {
  const globalContext = useContext(Context);
  const { signOut } = useAuth();

  const [sampleText, setSampleText] = useState("Hello, World!");
  const router = useRouter();
  const params = useSearchParams();
  const { data, type } = params || {};
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const { domain } = globalContext;
  const { basketList } = globalContext;
  const { isRetailerScanned } = globalContext;
  const { setRetailerScanned } = globalContext;
  const { retailerBarcodeData, retailerBarcodeType } = globalContext;
  const { setRetailerBarcodeData, setRetailerBarcodeType } = globalContext;

  const resetRetailerBarcode = () => {
    globalContext.setRetailerScanned(false);
    setRetailerBarcodeData(null);
    setRetailerBarcodeType(null);
    globalContext.setBasketList([]);
  };

  return (
    <View style={{ flex: 1 }} _dark={{ bg: "black" }} _light={{ bg: "white" }}>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      <Flex flex={1} alignItems="center" safeAreaTop>
        <Heading
          size="lg"
          fontSize={30}
          bold
          justifyContent="flex-start"
          style={{ fontFamily: "Rubik-Bold" }}
        >
          Home
        </Heading>
        <Divider
          my="2"
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.500",
          }}
        />

        <Spacer />
        {isRetailerScanned ? (
          <View>
            <Box
              borderWidth={1}
              borderColor="gray.200"
              width={300}
              borderRadius={10}
              p={4}
              bg={{
                linearGradient: {
                  colors: ["#0984e3", "violet.800"],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
            >
              <Text color="white" style={{ fontFamily: "Rubik-Bold" }}>
                Shopping with{" "}
              </Text>
              <Text color="white">
                Store: {retailerBarcodeData && retailerBarcodeData.length > 0 ?
                <Text style={{ fontFamily: "Rubik-Bold" }}>
                  {retailerBarcodeData[0].name}
                </Text>
                :
                "Unknown"
                }
                {"\nBarcode: "}
                {retailerBarcodeData && retailerBarcodeData.length > 0 ?
                <Text style={{ fontFamily: "Rubik-Bold" }}>
                  {retailerBarcodeData[0].barcode}
                </Text>
                :
                "Unknown"
                }
              </Text>


              <Text>&nbsp;</Text>
              <Button
                bg="brand.400"
                onPress={() => {
                  Alert.alert(
                    "Clear Retailer",
                    "Are you sure you want to clear the retailer you are shopping with?\n\nYour basket will be emptied!",
                    [
                      {
                        text: "Ok",
                        onPress: () => resetRetailerBarcode(),
                        style: "default",
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ]
                  );
                }}
              >
                Reset
              </Button>
            </Box>
          </View>
        ) : (
          <TouchableOpacity onPress={() => router.push("/home/Scan")}>
            <Box
              size={150}
              width={300}
              borderRadius={10}
              borderWidth={1}
              borderColor="gray.200"
              bg={{
                linearGradient: {
                  colors: ["#0984e3", "violet.800"],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
            >
              <Center size={150} width={300} borderRadius={10}>
                <Icon size={30} color={"white"} as={Entypo} name="shop" />
                <Text>&nbsp;</Text>
                <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                  Scan Retailer Barcode
                </Text>
              </Center>
            </Box>
          </TouchableOpacity>
        )}

        <Text>&nbsp;</Text>

        <TouchableOpacity
          onPress={() => router.push("/home/Scan")}
          disabled={!isRetailerScanned}
        >
          <Box
            size={150}
            width={300}
            borderRadius={10}
            borderWidth={1}
            borderColor="gray.200"
            bg={
              isRetailerScanned
                ? {
                    linearGradient: {
                      colors: ["lightBlue.300", "brand.400"],
                      start: [0, 0],
                      end: [1, 0],
                    },
                  }
                : "#b3b3b3"
            }
          >
            <Center size={150} width={300} borderRadius={10}>
              <Icon
                size={30}
                color={isRetailerScanned ? "white" : "gray.300"}
                as={MaterialCommunityIcons}
                name="barcode-scan"
              />
              <Text>&nbsp;</Text>
              <Text
                color={isRetailerScanned ? "white" : "gray.300"}
                style={{ fontFamily: "Rubik-Bold" }}
              >
                Scan Product Barcode
              </Text>
            </Center>
          </Box>
        </TouchableOpacity>
        <Spacer />
      </Flex>
    </View>
  );

}

export default Home;
