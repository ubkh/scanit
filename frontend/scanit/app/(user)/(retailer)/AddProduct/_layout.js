import { Stack } from "expo-router";

export default function AddProduct() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Scanner" options={{ headerTitle: "" }} />
      <Stack.Screen name="Form" options={{ headerTitle: "" }} />
    </Stack>
  );
}
