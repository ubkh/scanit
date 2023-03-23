import { useEffect, useState } from "react";
import { Slot, SplashScreen } from "expo-router";
import { useWindowDimensions, View, Text, Platform } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { extendTheme, NativeBaseProvider } from "native-base";
import { ColorTheme, Config } from "../Theme.js";
import { useFonts } from "expo-font";
import ContextProvider from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = extendTheme({ colors: ColorTheme });

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
        
  const { width } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
      setIsSmallScreen(width < 700 && Platform.OS === 'web');
  }, [width]);

  if (isSmallScreen) {
    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text>ScanIt Web cannot run on small screens.</Text>
        <Text>Increase the window size or download the mobile app.</Text>
      </View>
    );
  }

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