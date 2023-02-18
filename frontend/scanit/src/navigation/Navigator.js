import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerificationScreen from './screens/VerificationScreen';
import BarCodeScanComponent from '../components/BarCodeScanComponent';
import { Ionicons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import HeaderButtonStyle from '../styles/HeaderButtonStyle';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from '../GlobalContext';
import { useContext } from 'react';

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

const SignInStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "SignIn" component={SignInScreen}/>
        <Stack.Screen name = "SignUp" component={SignUpScreen}/>
        <Stack.Screen name = "ResetPassword" component={ResetPasswordScreen}/>
        <Stack.Screen name = "ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name = "Verification" component={VerificationScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  )
}

function Navigator(props) {
    const globalContext = useContext(Context)
    const { isLoggedin } = globalContext;

    return (
        <Stack.Navigator>
            {(!isLoggedin || !token)}
            <Stack.Screen name="Sign In" component={SignInStack} options={{ headerShown: false}}/>
            <Stack.Screen 
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
        </Stack.Navigator>
    )
}

export default Navigator;