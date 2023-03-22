import { Slot, SplashScreen } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { extendTheme, NativeBaseProvider, StorageManager } from "native-base";
import { ColorTheme, Components, Config } from "../Theme.js";
import { useFonts } from "expo-font";
import ContextProvider from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = extendTheme({ colors: ColorTheme, components: Components });

const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

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
    <NativeBaseProvider theme={theme} config={Config} colorModeManager={colorModeManager}>
        <AuthProvider>
        <ContextProvider>
            <Slot />
        </ContextProvider>
        </AuthProvider>
    </NativeBaseProvider>
  );
}