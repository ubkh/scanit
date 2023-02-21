import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from'@react-navigation/native';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import BarCodeScanComponent from '../components/BarCodeScanComponent';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderButtonStyle from '../styles/HeaderButtonStyle';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Basket" component={BasketScreen} options={{tabBarVisible: false}} />
      <Stack.Screen name="BarCodeScanComponent" component={BarCodeScanComponent} options={{headerTitle: ""}}/>
    </Stack.Navigator>
  );
}

// function WebNavigator() {
//     return (
//         <Stack.Navigator>
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//         <Stack.Screen name="Basket" component={BasketScreen} options={({ route }) => ({ title: route.params.name })} />
//         <Stack.Screen name="BarCodeScanComponent" component={BarCodeScanComponent} options={{headerTitle: ""}}/>
//         </Stack.Navigator>
//     );
// }

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
    },
    tabContent: {
      backgroundColor: 'white',
    },
    tabText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
  });


function WebNavigator() {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: '#34d399',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Another"
          component={AnotherScreen}
          options={{
            tabBarActiveTintColor: '#34d399',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  
  
  
function MobileNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeStack} 
                options={{
                    tabBarActiveTintColor: '#34d399',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
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
                name="Basket"
                component={BasketScreen}
                options={{
                    tabBarActiveTintColor: '#34d399',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
              name="Another" 
              component={AnotherScreen}
              options={{
                tabBarActiveTintColor: '#34d399',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                ),
              }} />
        </Tab.Navigator>
    )
}

function Navigator(props) {
    const navigation = useNavigation();
    return (
        <>
        { Platform.OS === 'web' ? (
            <WebNavigator />
        ) : (
            <MobileNavigator />
        )}
        </>
    );
}

export default Navigator;