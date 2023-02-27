import { Slot, Navigator, Tabs, useSegments, Redirect } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Context } from "../../../context/GlobalContext";
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from "native-base";

const links = [
];
  
export default function CustomerLayout() {
  const globalContext = useContext(Context);
  const { userType } = globalContext;
  const segments = useSegments();
  
  // TODO: Consider a context here to prevent access
  // prevent other users from accessing this group of pages
  if (userType !== "customer") {
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
             <Text bold>The customer side is not supported on web.</Text>
             <Text>&nbsp;</Text>
         </View>
    </Navigator>
  );
}


