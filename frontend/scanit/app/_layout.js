import { Slot, SplashScreen } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { extendTheme, NativeBaseProvider } from "native-base";
import { ColorTheme, Config } from "../Theme.js";
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
    return <SplashScreen />;
  }
  return (
    // Setup the auth context and render our layout inside of it.
    <NativeBaseProvider theme={theme} config={Config}>
        <AuthProvider>
        <ContextProvider>
            <Slot />
        </ContextProvider>
        </AuthProvider>
    </NativeBaseProvider>
  );
}