import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnotherScreen from './screens/AnotherScreen';
import HomeScreen from './screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Navigator(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeScreen} 
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