import { View, Text, Heading, Flex, StatusBar, Spacer, useColorMode } from 'native-base';
import { Platform } from 'react-native';
import LogOutButton from '../../../components/LogOutButtonComponent';

function Other() {
    const { colorMode } = useColorMode();

    return (
        <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <Flex flex={1} alignItems="center">
            <Spacer />
            <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Something Else</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>You are somewhere else!</Text>
            {Platform.OS !== 'web' && <LogOutButton />}

            <Spacer />
        </Flex>
        </View>
    );
}

export default Other;