import { View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/base';
import { Context } from '../../GlobalContext';
import ContainerStyle from '../../styles/ContainerStyle';

function BasketScreen(props) {
    const globalContext = useContext(Context);
    const { isLoggedIn, logIn } = globalContext;
    const { basketList } = globalContext;
    const [basketString, setBasketString] = useState((basketList.length > 0) ? `Basket contains: ${basketList.length} items`: "Basket is empty");

    useEffect(() => {
        setBasketString((basketList.length > 0) ? `Basket contains: ${basketList.length} items`: "Basket is empty");
    }, [basketList]);

    return (
        <View style={ContainerStyle.container}>
            <Text>Another screen!</Text>
            <Text>You are {(isLoggedIn)? '' : "not "}logged in</Text>
            <Text>{basketString}</Text>
        </View>
    );
};

export default BasketScreen;
