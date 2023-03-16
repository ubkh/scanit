import { Stack } from "expo-router";
import { useColorMode } from "native-base";

export default function HomeStack() {
    const { colorMode } = useColorMode();
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == "dark" ? "black" : "white",
            },
            headerTintColor: colorMode == "dark" ? "white" : "black",
        }}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="Scan" options={{headerTitle: ""}}/>
        </Stack>
    )
}