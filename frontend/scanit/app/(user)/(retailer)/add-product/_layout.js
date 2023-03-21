import { Stack } from "expo-router";

export default function AddProduct() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="scanner" options={{ headerTitle: "" }} />
      <Stack.Screen name="form" options={{ headerTitle: "Add a product" }} />
    </Stack>
  );
}
