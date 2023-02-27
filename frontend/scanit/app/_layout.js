import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { extendTheme, NativeBaseProvider } from "native-base";
import { ColorTheme } from "../Theme.js";
import { useFonts } from "expo-font";
import ContextProvider from "../context/GlobalContext";


const theme = extendTheme({ colors: ColorTheme });

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }
  return (
    // Setup the auth context and render our layout inside of it.
    <NativeBaseProvider theme={theme}>
        <AuthProvider>
        <ContextProvider>
            <Slot />
        </ContextProvider>
        </AuthProvider>
    </NativeBaseProvider>
  );
}