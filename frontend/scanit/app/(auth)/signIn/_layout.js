import { Stack } from "expo-router";
import { useColorMode } from "native-base";
import { Platform } from "react-native";

export default function SignInStack() {
    const { colorMode } = useColorMode();
    const forgotPassHeaderShown = Platform.OS == "web" ? false : true;

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == "dark" ? "black" : "white",
            },
            headerTintColor: colorMode == "dark" ? "white" : "black",
        }}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="forgotPass" options={{headerTitle: "", headerShown: forgotPassHeaderShown}}/>
        </Stack>
    )
}