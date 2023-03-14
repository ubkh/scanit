import { View, Text, Heading } from 'native-base';
import { Platform } from 'react-native';
import ContainerStyle from '../../../styles/ContainerStyle';
import LogOutButton from '../../../components/LogOutButtonComponent';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter,Navigator, Link } from "expo-router";



function Home() {

    const router = useRouter();
    // const barcode = () => {
    //     router.push("/Barcode");
    // }
    const assignStaff = () => {
        router.push("/assignStaffPage");
    }
    if (Platform.OS === 'web') {
        return (
            <View style={ContainerStyle.container}>
                <Heading size="lg" fontSize={30} bold justifyContent="flex-start">Home</Heading>
                <Text style={{ fontFamily: 'Rubik-Bold' }}>You are in the retailer home!</Text>
                <CustomButton text = "Assign Staff" onPress={assignStaff}/>
                {/* <CustomButton text = "My Barcode" onPress={barcode}/> */}
                {Platform.OS !== 'web' && <LogOutButton />}
            </View>
        );
    }
    return (
        
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                 <Text bold>The retail side is not supported on mobile.</Text>
                 <Text>&nbsp;</Text>
             </View>
       
      );
}

export default Home;