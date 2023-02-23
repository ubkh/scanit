// import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { registerRootComponent } from 'expo';
// import ContextProvider from './context/GlobalContext';
// import Navigator from './src/navigation/Navigator';
// import { NativeBaseProvider, extendTheme } from 'native-base';
// import { ColorTheme } from './Theme.js';
// import { useFonts } from 'expo-font';

import "expo-router/entry";

// const theme = extendTheme({ colors: ColorTheme });

// function App(props) {
//   const [fontsLoaded] = useFonts({
//     'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
//     'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
//     'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
//   });

//   if (!fontsLoaded) {
//     return null;
//   }
//   //console.log("Platform.OS: " + Platform.OS)
//   // if (Platform.OS === 'web') {
//   //   return (
//   //     <View style={styles.container}>
//   //       <Text>This section of ScanIt is not supported on web.</Text>
//   //     </View>
//   //   );
//   // }
//   return (
//     <NativeBaseProvider theme={theme}>
//       <ContextProvider>
//           <NavigationContainer>
//             <Navigator/>
//           </NavigationContainer>
//       </ContextProvider>
//     </NativeBaseProvider>
//   );
// }

// export default registerRootComponent(App);