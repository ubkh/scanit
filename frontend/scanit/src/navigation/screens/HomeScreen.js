import { View, Platform, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { useNavigation, useRoute } from'@react-navigation/native';
import { Button, Text } from '@rneui/base';
import { Context } from '../../GlobalContext';
import ContainerStyle from '../../styles/ContainerStyle';

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
  

function HomeScreen(props, route) {
    const [sampleText, setSampleText] = useState("Hello, World!");
    route = useRoute();
    const {data, type} = route.params || {};
    const globalContext = useContext(Context);
    const navigation = useNavigation();
    const { domain } = globalContext;
    const { basketList } = globalContext;
    const { isRetailerScanned } = globalContext;
    const { setRetailerScanned } = globalContext;
    const { retailerBarcodeData, retailerBarcodeType } = globalContext;
    const { setRetailerBarcodeData, setRetailerBarcodeType } = globalContext;
    const [refresh, setRefresh] = useState(false); // Add a state variable to trigger re-render

    const resetRetailerBarcode = () => {
        globalContext.setRetailerScanned(false);
        setRetailerBarcodeData(null);
        setRetailerBarcodeType(null);
        globalContext.setBasketList([]);
        console.log("Reset retailer")
    };

    console.log(data);
    console.log(type);
    console.log(basketList);
    console.log(isRetailerScanned);

    return (
        <View style={ContainerStyle.container}>
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
            <Button onPress={() => getTestList(setSampleText, domain)}
                title="GET data">
            </Button>
            <Text>&nbsp;</Text>
            <Button onPress={() => navigation.navigate('BarCodeScanComponent')}
                title="Scan Retailer Barcode!" disabled={isRetailerScanned}>
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
            <Button onPress={() => navigation.navigate('BarCodeScanComponent')}
                title="Scan Barcode!" disabled={!isRetailerScanned}>
            </Button>
            <Text>&nbsp;</Text>
            <Text>Info on most recent barcode scanned (retailer/product):</Text>
            <Text>&nbsp;</Text>
            {data ? <Text>Data: {JSON.stringify(data)}</Text> : <Text>Nothing yet</Text>}
            {type ? <Text>Type: {JSON.stringify(type)}</Text> : <Text>Nothing yet</Text>}
            <StatusBar style="auto" />
        </View>
    );
}

  
export default HomeScreen;