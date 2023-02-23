import { Slot, Navigator, Tabs } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Context } from "../../../context/GlobalContext";
import { Ionicons } from '@expo/vector-icons';

const links = [
    { label: 'Home', url: '/home' },
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
            </Tabs>
    )
  }
  return (
    // Setup the auth context and render our layout inside of it.
    <Navigator router={TabRouter}>
        <NavBarComponent links={ links } isSmallScreen={ isSmallScreen } />
        <Slot />
    </Navigator>
  );
}



