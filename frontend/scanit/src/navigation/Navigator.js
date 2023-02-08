import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import BarCodeScanComponent from '../components/BarCodeScanComponent';
import { Ionicons } from '@expo/vector-icons';

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
                }}
            />
            <Tab.Screen name="Another" component={AnotherScreen} />
        </Tab.Navigator>
    )
}

export default Navigator;