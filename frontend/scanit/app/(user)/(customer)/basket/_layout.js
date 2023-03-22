import { Stack } from "expo-router";
import { useColorMode } from "native-base";

export default function PaymentStack() {
    const { colorMode } = useColorMode();

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == "dark" ? "black" : "white",
            },
            headerTintColor: colorMode == "dark" ? "white" : "black",
        }}>
            <Stack.Screen name="Basket" options={{headerShown: false}} />
            <Stack.Screen name="payment" options={{headerTitle: ""}}/>
        </Stack>
    )
}