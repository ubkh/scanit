import { Stack } from "expo-router";

export default function Products() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="view" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="edit"
        options={{ headerTitle: "Edit product details" }}
      />
    </Stack>
  );
}
