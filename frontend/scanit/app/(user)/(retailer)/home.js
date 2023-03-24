import {
  View,
  Text,
  Heading,
  StatusBar,
  ScrollView,
  Center,
  Flex,
  SimpleGrid,
  Icon,
  Divider,
  useColorMode,
  Box
} from "native-base";
import { Platform } from "react-native";
import LogOutButton from "../../../components/LogOutButtonComponent";
import { useForm } from "react-hook-form";
import { useRouter, Navigator, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
          Home
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
      
      <ScrollView mx={8} _android={{mx: 12}}showsVerticalScrollIndicator={false} >
      <Text textAlign="center" _web={{textAlign:"start"}}>
        You can view a full analysis of your store's performance here.
      </Text>
      <Text>&nbsp;</Text>
      
    
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={5} spacingY={5} my={4} >
        <Box
            size={200}
            width={310}
            _android={{ width: "100%" }}
            borderRadius={10}
            borderWidth={1}
            borderColor="gray.200"
            bg={{
            linearGradient: {
                colors: ["#4834d4", "#22a6b3"],
                start: [0, 0],
                end: [1, 0],
            },
            }}
        >
            <Center size={200} width={310} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Some statistic here
            </Text>
            </Center>
        </Box>
        
        <Box
            size={200}
            width={310}
            borderRadius={10}
            borderWidth={1}
            borderColor="gray.200"
            bg={{
            linearGradient: {
                colors: ["#e67e22", "#8e44ad"],
                start: [0, 0],
                end: [1, 0],
            },
            }}
        >
            <Center size={200} width={310} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Some statistic here
            </Text>
            </Center>
        </Box>
                
        <Box
            size={200}
            width={310}
            borderRadius={10}
            borderWidth={1}
            borderColor="gray.200"
            bg={{
            linearGradient: {
                colors: ["#ff6b6b", "#10ac84"],
                start: [0, 0],
                end: [1, 0],
            },
            }}
        >
            <Center size={200} width={310} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Some statistic here
            </Text>
            </Center>
        </Box>
        

        <Box
            size={200}
            width={310}
            borderRadius={10}
            borderWidth={1}
            borderColor="gray.200"
            bg={{
            linearGradient: {
                colors: ["#f9ca24", "#8e44ad"],
                start: [0, 0],
                end: [1, 0],
            },
            }}
        >
            <Center size={200} width={300} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Some statistic here
            </Text>
            </Center>
        </Box>
      </SimpleGrid>
      </ScrollView>
  </Box>
  );
}

export default Home;
