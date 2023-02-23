import { Slot, Navigator, Tabs } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../components/NavBarComponent";
import { Context } from "../../context/GlobalContext";
import { Ionicons } from '@expo/vector-icons';

const links = [
    { label: 'Home', url: '/' },
    { label: 'Basket', url: '/Basket' },
    { label: 'Another', url: '/Another' },
];

export default function CustomerLayout() {
  const { basketList } = useContext(Context);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
      setIsSmallScreen(width < 600);
  }, [width]);

  if (Platform.OS !== "web") {
    return (
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#34d399'
                
            }}>
                <Tabs.Screen 
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                        ),
                    }}>
                </Tabs.Screen>
                <Tabs.Screen 
                    name="Basket"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                        ),
                        tabBarBadge: basketList.length > 0 ? basketList.length : null,
                        tabBarBadgeStyle: {
                            backgroundColor: 'red',
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 'bold',
                            minWidth: 20,
                            height: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 5,
                            paddingTop: 2,
                        },
                    }}>
                </Tabs.Screen>
                <Tabs.Screen 
                    name="Another"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                        ),
                    }}>
                </Tabs.Screen>
                {/* There might be a better way of doing this */}
                {/* Maybe using initialRouteName? */}
                <Tabs.Screen 
                    name="index"
                    options={{
                        tabBarButton: () => null,
                    }}>
                </Tabs.Screen>
            </Tabs>
    )
  }
  return (
    // Setup the auth context and render our layout inside of it.
    <ContextProvider>
        <Navigator router={TabRouter}>
            <NavBarComponent links={ links } isSmallScreen={ isSmallScreen } />
            <Slot />
        </Navigator>
    </ContextProvider>
  );
}



