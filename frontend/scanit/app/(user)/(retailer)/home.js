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
import { useState, useContext, useEffect } from "react";
import { Platform } from "react-native";
import LogOutButton from "../../../components/LogOutButtonComponent";
import { useForm } from "react-hook-form";
import { useRouter, Navigator, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../../../context/GlobalContext";
import { useAuth } from "../../../context/AuthContext";

function Home() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [ storeBarcode, setStoreBarcode ] = useState('');
  const [ transactionList, setTransactionList ] = useState([]);
  const [ totalMade, setTotalMade ] = useState(0);
  const [ quantitySold, setQuantitySold ] = useState(0);
  const [ averagePerTransaction, setAveragePerTransaction ] = useState(0);
  const { user, loading } = useAuth();
  const globalContext = useContext(Context);
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

  const getStoreBarcode = async () => {
        
    const shop_id = {"store_id" : user.user.employed_at_id}
    const JSONobj = JSON.stringify(shop_id);
    
    fetch(`http://${globalContext.domain}/api/retailer/get-barcode/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONobj,
      credentials: "include",
    })
    .then(res => {
    if (res.ok) {
        return res.json()
      } else {
        console.log(res);
        setError('error innit')
        throw res.json()
      }
    })
    .then(json => {
      setStoreBarcode(json.barcode)
    })
    .catch(error => {
      console.log(error)
    })
    
  }
  

  const calcTotalSalesMade = async () => {
    try {
      // AWAIT THE RESPONSE SO WE DON'T CONTINUE WITHOUT THIS
      const response = await fetch(`http://${globalContext.domain}/api/transactions-by-barcode/?barcode=${storeBarcode}`,
      {
        method: "GET",
      });

      const transactions = await response.json();

      setTransactionList(transactions)

    } catch (error) {
      console.error(error);
    }
  }

  const calcTotalSales = () => {
    let sum = 0;

    for (let i = 0; i < transactionList.length; i++) {
      const item = transactionList[i];
      const amount = parseInt(item.amount) || 0;
      sum += amount;
    }

    let items = 0

    for (let i = 0; i < transactionList.length; i++) {
      const product = transactionList[i];
      const jsonString = product.products.replace(/'/g, "\"");
      const jsonList = JSON.parse(jsonString);
      for (let j = 0; j < jsonList.length; j++) {
        const productAmount = jsonList[j].quantity
        items += productAmount
      }
    }
  
    setQuantitySold(items);

    setTotalMade(sum)

  }

  const calcAveragePerTransaction = () => {
    let sum = 0;

    for (let i = 0; i < transactionList.length; i++) {
      const item = transactionList[i];
      const amount = parseInt(item.amount) || 0;
      sum += amount;
    }

    const average = sum / transactionList.length

    setAveragePerTransaction(average)

  }
  

  useEffect(() => {
    getStoreBarcode();
  }, [])
  
  useEffect( () => {
    if (storeBarcode !== '') {
      calcTotalSalesMade();
    }
  }, [storeBarcode])

  useEffect( () => {
    if (transactionList.length > 0) {
      calcTotalSales();
      calcAveragePerTransaction();
    }
  }, [transactionList])
  

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
            width={260}
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
            <Center size={200} width={260} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Total sales made: {transactionList.length === 0 ? "None" : transactionList.length}
            </Text>
            </Center>
        </Box>
        
        <Box
            size={200}
            width={260}
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
            <Center size={200} width={260} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Total earned: {"£" + (totalMade / 100)}
            </Text>
            </Center>
        </Box>
                
        <Box
            size={200}
            width={260}
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
            <Center size={200} width={260} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Number of items sold: {quantitySold}
            </Text>
            </Center>
        </Box>
        

        <Box
            size={200}
            width={260}
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
            <Center size={200} width={260} borderRadius={10}>
            <Icon size={30} color={"white"} as={Ionicons} name="card-outline" />
            <Text>&nbsp;</Text>
            <Text color={"white"} style={{ fontFamily: "Rubik-Bold" }}>
                Average per transaction {"£" + averagePerTransaction / 100}
            </Text>
            </Center>
        </Box>
      </SimpleGrid>
      </ScrollView>
  </Box>
  );
}

export default Home;
