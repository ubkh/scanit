import { View, Text, Heading, Flex, StatusBar, Spacer, useColorMode } from 'native-base';
import { Platform } from 'react-native';
import LogOutButton from '../../../components/LogOutButtonComponent';

function Home() {
    const { colorMode } = useColorMode();

    return (
        <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <Flex flex={1} alignItems="center">
            <Spacer />
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Home</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>You are in the retailer home!</Text>
            {Platform.OS !== 'web' && <LogOutButton />}

            <Spacer />
        </Flex>
        </View>
    );
}

export default Home;