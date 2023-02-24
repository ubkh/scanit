import { View, Text, Button, Box, Heading, StatusBar } from 'native-base';
import ContainerStyle from '../../../styles/ContainerStyle';

function Other() {
    return (
        <View style={ContainerStyle.container}>
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start">Something Else</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>You are somewhere else!</Text>

        </View>
    );
}

export default Other;