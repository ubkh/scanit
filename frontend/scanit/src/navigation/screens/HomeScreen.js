import { View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react';
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

function HomeScreen(props) {
    const [sampleText, setSampleText] = useState("Hello, World!");
    const globalContext = useContext(Context);
    const { domain } = globalContext;

    return (
        <View style={ContainerStyle.container}>
        <Text>{sampleText}</Text>
        <Text>&nbsp;</Text>
        <Button onPress={() => getTestList(setSampleText, domain)}
            title="GET data">
        </Button>
        <StatusBar style="auto" />
        </View>
    );
}

  
export default HomeScreen;