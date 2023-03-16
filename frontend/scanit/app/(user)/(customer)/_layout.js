import { Slot, Navigator, Tabs, useSegments, Redirect } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Context } from "../../../context/GlobalContext";
import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorMode } from "native-base";

const links = [
];

export default function CustomerLayout() {
  const globalContext = useContext(Context);
  const { userType } = globalContext;
  const segments = useSegments();
  const { colorMode } = useColorMode();
  
  // TODO: Consider a context here to prevent access
  // prevent other users from accessing this group of pages
  if (userType !== "customer") {
    console.log("USER " + userType);
    return (
        <Redirect href={`/(${userType})/${segments[2]}`} />
    )
  }

  const { basketList } = globalContext;

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
      setIsSmallScreen(width < 600);
  }, [width]);

  function getNumberOfBasketItems() {
    let total = 0;
    for (let i = 0; i < basketList.length; i++) {
        total += basketList[i].quantity;
    }

    let display = ''
    
    if (total > 99) {
        display = "99+"
    }
    else{
        display = total.toString()
    }

    return total > 0 ? display : null;
  }

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
                <Tabs.Screen 
                    name="basket"
                    options={{
                        title: "Basket",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                        ),
                        tabBarBadge: basketList.length > 0 ? getNumberOfBasketItems() : null,
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
                        headerShown: true,
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="newspaper-outline" color={color} size={size} />
                        ),
                        backgroundColor: '#0f0f0f',
                    }}>
                </Tabs.Screen>
                <Tabs.Screen 
                    name="Settings"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                        ),
                        backgroundColor: '#0f0f0f',
                    }}>
                </Tabs.Screen>
                {/* <Tabs.Screen 
                    name="index"
                    options={{
                        tabBarButton: () => null,
                    }}>
                </Tabs.Screen> */}
            </Tabs>
    )
  }
  // for now no customer support on web, but can make it limited if we need to
  return (
    <Navigator router={TabRouter}>
        <NavBarComponent links={ links } isSmallScreen={ isSmallScreen } />
        <View _dark={{bg: "black"}} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
             <Text bold>The customer side is not supported on web.</Text>
             <Text>&nbsp;</Text>
         </View>
    </Navigator>
  );
}



