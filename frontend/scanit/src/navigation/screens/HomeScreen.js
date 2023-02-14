import { View, Platform } from 'react-native';
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

    console.log(data);
    console.log(type);
    console.log(basketList);

    return (
        <View style={ContainerStyle.container}>
        <Text>{sampleText}</Text>
        <Text>&nbsp;</Text>
        <Button onPress={() => getTestList(setSampleText, domain)}
            title="GET data">
        </Button>
        <Text>&nbsp;</Text>
        <Button onPress={() => navigation.navigate('BarCodeScanComponent')}
            title="Scan Barcode!">
        </Button>
        <Text>&nbsp;</Text>
        <Text>Info on recent barcode scanned:</Text>
        <Text>&nbsp;</Text>
        {data ? <Text>Data: {JSON.stringify(data)}</Text> : <Text>Nothing yet</Text>}
        {type ? <Text>Type: {JSON.stringify(type)}</Text> : <Text>Nothing yet</Text>}
        <StatusBar style="auto" />
        </View>
    );
}

  
export default HomeScreen;