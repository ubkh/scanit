import {
  View,
  Text,
  Heading,
  Flex,
  StatusBar,
  Spacer,
  Button,
  useColorMode,
} from "native-base";
import { Platform } from "react-native";
import LogOutButton from "../../../components/LogOutButtonComponent";
import { useForm } from "react-hook-form";
import { useRouter, Navigator, Link } from "expo-router";

function Home() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const assignStaff = () => {
    router.push("/assignStaffPage");
  };
  // if (Platform.OS === 'web') {
  //     return (
  //         <View style={ContainerStyle.container}>
  //             <Heading size="lg" fontSize={30} bold justifyContent="flex-start">Home</Heading>
  //             <Text style={{ fontFamily: 'Rubik-Bold' }}>You are in the retailer home!</Text>
  //             <CustomButton text = "Assign Staff" onPress={assignStaff}/>
  //             {/* <CustomButton text = "My Barcode" onPress={barcode}/> */}
  //             {Platform.OS !== 'web' && <LogOutButton />}
  //         </View>
  //     );
  // }
  return (
    <View style={{ flex: 1 }} _dark={{ bg: "black" }} _light={{ bg: "white" }}>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      <Flex flex={1} alignItems="center">
        <Spacer />
        <Heading
          size="lg"
          fontSize={30}
          bold
          justifyContent="flex-start"
          style={{ fontFamily: "Rubik-Bold" }}
        >
          Home
        </Heading>
        <Text style={{ fontFamily: "Rubik-Bold" }}>
          You are in the retailer home!
        </Text>
        <Text>&nbsp;</Text>

        <Button
          bg="brand.400"
          width="100%"
          maxWidth="300px"
          onPress={handleSubmit(assignStaff)}
        >
          Assign staff
        </Button>
        <Text>&nbsp;</Text>
        <Button
          bg="brand.400"
          width="100%"
          maxWidth="300px"
          onPress={() => router.push("/(retailer)/add-product")}
        >
          Add a product to the system
        </Button>
        <Text>&nbsp;</Text>
        <Button
          bg="brand.400"
          width="100%"
          maxWidth="300px"
          onPress={() => router.push("/(retailer)/products")}
        >
          Products
        </Button>
        {Platform.OS !== "web" && <LogOutButton />}

        <Spacer />
      </Flex>
    </View>
  );
}

export default Home;
