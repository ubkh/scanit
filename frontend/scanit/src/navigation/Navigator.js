import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from'@react-navigation/native';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import BarCodeScanComponent from '../components/BarCodeScanComponent';
import { Ionicons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import HeaderButtonStyle from '../styles/HeaderButtonStyle';
import ItemLoader from '../components/ItemLoader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Basket" component={BasketScreen} options={{tabBarVisible: false}} />
      <Stack.Screen name="BarCodeScanComponent" component={BarCodeScanComponent} options={{headerTitle: ""}}/>
      <Stack.Screen name="ItemLoader" component={ItemLoader}/>
    </Stack.Navigator>
  );
}


function Navigator(props) {
  const navigation = useNavigation();
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
                      <TouchableOpacity onPress={() => navigation.navigate("Basket")}
                        // Alert.alert(
                        // 'Shopping Cart Button',
                        // 'You pressed the shopping cart button!',
                        // [
                        //   {
                        //     text: 'Ok',
                        //     onPress: () => console.log("Ok on dialog was pressed"),
                        //     style: 'default',
                        //   },
                        //   {
                        //     text: 'Dismiss',
                        //     onPress: () => console.log("Dismiss on dialog was pressed"),
                        //     style: 'cancel',
                        //   },
                        // ],)
                        >
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
        </Tab.Navigator>
    )
}

export default Navigator;