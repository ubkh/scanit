import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ContextProvider from './GlobalContext';
import Navigator from './navigation/Navigator';

function App(props) {
  //console.log("Platform.OS: " + Platform.OS)
  // if (Platform.OS === 'web') {
  //   return (
  //     <Text>Hackerman456</Text>
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