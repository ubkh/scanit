import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ContextProvider from './GlobalContext';
import Navigator from './navigation/Navigator';

function App(props) {
  //console.log("Platform.OS: " + Platform.OS)
  // if (Platform.OS === 'web') {
  //   return (
  //     <View style={styles.container}>
  //       <Text>This section of ScanIt is not supported on web.</Text>
  //     </View>
  //   );
  // }
  return (
    <ContextProvider>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default registerRootComponent(App);