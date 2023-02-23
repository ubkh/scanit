import { View, Text, Button, Box, Heading, StatusBar } from 'native-base';
import { useAuth } from '../../../context/AuthContext';
import { Link, useRouter, useSearchParams } from "expo-router";
import { useState, useContext } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Context } from '../../../context/GlobalContext';
import ContainerStyle from '../../../styles/ContainerStyle';

function getTestList(setSampleText, domain) {
    return fetch(`http://${domain}/api/list`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setSampleText(json[0].text);
            return json;
        })
        .catch((error) => {
            console.error(error);
        }
    );
}

function Home() {
    const [sampleText, setSampleText] = useState("Hello, World!");
    //route = useRoute();
    const router = useRouter();
    const params = useSearchParams();
    const {data, type} = params || {};
    const globalContext = useContext(Context);
    //const navigation = useNavigation();
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
        console.log("Reset retailer and basket")
    };

    console.log(`Most recent barcode data: ${data}`);
    console.log(`Most recent barcode type: ${type}`);
    console.log(basketList);
    console.log(`Has retailer been scanned? ${isRetailerScanned}`);

    return (
        <View style={ContainerStyle.container}>
            <Heading size="lg" fontSize={30} bold justifyContent="left" style={{ fontFamily: 'Rubik-Bold' }}>Home</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>This is some test text using a font!</Text>
            {isRetailerScanned ?
                <View style={{justifyContent: 'flex-start', padding: 20,}}> 
                <Text style={{fontWeight: 'bold'}}>
                    Currently shopping with retailer with barcode: {retailerBarcodeData}
                </Text>
                </View>
                : null
            }
            <Text>{sampleText}</Text>
            <Text>&nbsp;</Text>
            <Button onPress={() => getTestList(setSampleText, domain)} bg="brand.400">
                GET data
            </Button>
            <Text>&nbsp;</Text>
            <Button onPress={() => router.push('/home/Scan')}
                disabled={isRetailerScanned} shadow={2} bg="brand.400">
                Scan Retailer Barcode!
            </Button>
            {isRetailerScanned ?
                <View> 
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Clear Retailer',
                            'Are you sure you want to clear the retailer you are shopping with?\n\nYour basket will be emptied!',
                            [
                                {
                                text: 'Ok',
                                onPress: () => resetRetailerBarcode(),
                                style: 'default',
                                },
                                {
                                text: 'Cancel',
                                onPress: () => {
                                    console.log("Cancelled retailer reset")
                                },
                                style: 'cancel',
                                },
                            ],
                        )
                    }
                }>
                    <Text style={{fontStyle: "italic", textDecorationLine: "underline"}}>Reset retailer</Text>
                </TouchableOpacity>
                <Text>&nbsp;</Text>
                </View> 
                : null}
            <Text>&nbsp;</Text>
            <Text>Retailer barcode info:</Text>
            <Text>&nbsp;</Text>
            {retailerBarcodeData ? <Text>Data: {JSON.stringify(retailerBarcodeData)}</Text> : <Text>Nothing yet</Text>}
            {retailerBarcodeType ? <Text>Type: {JSON.stringify(retailerBarcodeType)}</Text> : <Text>Nothing yet</Text>}
            <Text>&nbsp;</Text>
            <Button bg="brand.400" onPress={() => router.push('/home/Scan')}
                disabled={!isRetailerScanned}>
                    Scan Product Barcode!
            </Button>
            <Text>&nbsp;</Text>
            <Text>Info on most recent barcode scanned (retailer/product):</Text>
            <Text>&nbsp;</Text>
            {data ? <Text>Data: {JSON.stringify(data)}</Text> : <Text>Nothing yet</Text>}
            {type ? <Text>Type: {JSON.stringify(type)}</Text> : <Text>Nothing yet</Text>}

            <Text>&nbsp;</Text>
            <LogOutButton />
            <StatusBar style="auto" />
        </View>
    );
}

function LogOutButton() {
    const { signOut } = useAuth();
    const router = useRouter();
  
    return (
       <Button
        bg="red.500"
        onPress={ (ev) => {
            signOut();
            router.push("/sign-in");
        }}>
            Log Out
        </Button>
    );
  }

export default Home;