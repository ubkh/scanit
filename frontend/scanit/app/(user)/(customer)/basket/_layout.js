import { Stack } from "expo-router";

export default function PaymentStack() {
    return (
        <Stack>
            <Stack.Screen name="Basket" options={{headerShown: false}} />
            <Stack.Screen name="payment" options={{headerTitle: ""}}/>
        </Stack>
    )
}