import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import BarCodeScanComponent from '../components/BarCodeScanComponent';
import { Ionicons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import HeaderButtonStyle from '../styles/HeaderButtonStyle';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="BarCodeScanComponent" component={BarCodeScanComponent} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function SignInStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function Navigator(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeStack} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerRight: () => (
                      <TouchableOpacity onPress={() => Alert.alert(
                        'Shopping Cart Button',
                        'You pressed the shopping cart button!',
                        [
                          {
                            text: 'Ok',
                            onPress: () => console.log("Ok on dialog was pressed"),
                            style: 'default',
                          },
                          {
                            text: 'Dismiss',
                            onPress: () => console.log("Dismiss on dialog was pressed"),
                            style: 'cancel',
                          },
                        ],)}>
                        <Ionicons name="cart-outline" style={HeaderButtonStyle.button} size={35}/>
                      </TouchableOpacity>
                    ),
                  }}
            />
            <Tab.Screen 
              name="Another" 
              component={AnotherScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                ),
              }} />
              <Tab.Screen 
              name="Sign Up" 
              component={SignInStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                ),
              }} />
        </Tab.Navigator>
    )
}

export default Navigator;