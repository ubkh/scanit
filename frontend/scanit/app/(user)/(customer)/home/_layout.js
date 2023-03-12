import { Stack } from "expo-router";

export default function HomeStack() {
    return (
        <Stack screenOptions={{
            headerBackTitleStyle: {color: "brand.400"},
        }}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="Scan" options={{headerTitle: ""}}/>
        </Stack>
    )
}