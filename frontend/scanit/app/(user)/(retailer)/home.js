import { View, Text, Heading } from 'native-base';
import { Platform } from 'react-native';
import ContainerStyle from '../../../styles/ContainerStyle';
import LogOutButton from '../../../components/LogOutButtonComponent';

function Home() {
    return (
        <View style={ContainerStyle.container}>
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start">Home</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>You are in the retailer home!</Text>
            {Platform.OS !== 'web' && <LogOutButton />}
        </View>
    );
}

export default Home;