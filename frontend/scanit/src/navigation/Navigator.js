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
import { Context } from '../GlobalContext';
import { useContext } from 'react';
import { withBadge } from '@rneui/base';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="BarCodeScanComponent" component={BarCodeScanComponent} options={{headerTitle: ""}}/>
    </Stack.Navigator>
  );
}


function Navigator(props) {
  const navigation = useNavigation();
  const globalContext = useContext(Context);
  const { basketList } = globalContext;

  const BasketIconWithBadge = withBadge(basketList.length, {
    badgeStyle: {backgroundColor: 'red'},
    textStyle: {color: 'white'},
  }) (Ionicons); // wrapping the Ionicons with the high order function to add number badge

  function renderBasketIconWithBadge(color, size) {
    if (basketList.length > 0) {
      return (
        <BasketIconWithBadge
          name="cart-outline"
          color={color}
          size={size}
        />
      );
    } else {
      return <Ionicons name="cart-outline" color={color} size={size} />;
    }
  }

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeStack} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
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
              name="Basket" 
              component={BasketScreen}
              options={{
                tabBarIcon: ({ color, size }) => renderBasketIconWithBadge(color, size),
              }} />
        </Tab.Navigator>
    )
}

export default Navigator;