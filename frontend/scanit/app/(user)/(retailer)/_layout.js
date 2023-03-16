import { Slot, Navigator, Tabs, useSegments, Redirect } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { useColorMode } from "native-base";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Context } from "../../../context/GlobalContext";
import { Ionicons } from '@expo/vector-icons';

const links = [
    { label: 'Home', url: '/(retailer)/home' },
    { label: 'Something Else', url: '/other' },
];

export default function RetailerLayout() {
  const globalContext = useContext(Context);
  const { userType } = globalContext;
  const segments = useSegments();

  const { colorMode } = useColorMode();

  // TODO: Consider a context here to prevent access
  // prevent other users from accessing this group of pages
  if (userType === undefined) {
    return (
        <Redirect href={`/(auth)/signIn`} />
    )
  } else if (userType !== "retailer") {
    return (
        <Redirect href={`/(${userType})/${segments[2]}`} />
    )
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
      setIsSmallScreen(width < 600);
  }, [width]);

  if (Platform.OS !== "web") {
    return (
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#34d399',
                tabBarStyle: { backgroundColor: colorMode == "dark" ? "black" : "white" },
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
    <Navigator router={TabRouter}>
        <NavBarComponent links={ links } isSmallScreen={ isSmallScreen } />
        <Slot />
    </Navigator>
  );
}



