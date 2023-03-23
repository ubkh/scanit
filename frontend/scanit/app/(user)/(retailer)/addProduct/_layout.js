import { Stack } from "expo-router";
import { useColorMode } from "native-base";

export default function AddProductLayout() {
  const { colorMode } = useColorMode();
  
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: colorMode == "dark" ? "black" : "white",
      },
      headerTintColor: colorMode == "dark" ? "white" : "black",
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="scanner" options={{ headerTitle: "" }} />
      <Stack.Screen name="form" options={{ headerTitle: "Add a product" }} />
    </Stack>
  );
}
