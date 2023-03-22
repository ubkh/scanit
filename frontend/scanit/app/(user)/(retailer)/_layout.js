import { Slot, Navigator, Tabs, useSegments, Redirect } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { useWindowDimensions, Platform } from "react-native";
import { useColorMode } from "native-base";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import ProductDataProvider from "../../../context/RetailerProductContext";

const links = [
    { label: 'Home', url: '/(retailer)/home' },
    { label: 'Something Else', url: '/other' },
    { label: 'Add Item', url: '/addItem' },
    { label: 'Assign Staff', url: '/assignStaffPage' },
    { label: "Add a product", url: "/(retailer)/add-product" },
    { label: "Products", url: "/products" },
    { label: "Account", url: "/Account" },
];

export default function RetailerLayout() {
  const { userType, loading } = useAuth();
  const segments = useSegments();
  const { colorMode } = useColorMode();

  // TODO: Consider a context here to prevent access
  // prevent other users from accessing this group of page/s
  // if (userType !== "retailer") {
  //   return <Redirect href={`/(${userType})/${segments[2]}`} />;
  // }
  if (userType !== "retailer") {
    return <Redirect href={`/(${userType})/${segments[2]}`} />;
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsSmallScreen(width < 600);
  }, [width]);

  return (
    <ProductDataProvider>
      {Platform.OS !== "web" ? (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#34d399",
            tabBarStyle: {
              backgroundColor: colorMode == "dark" ? "black" : "white",
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="add-product"
            options={{
              title: "Add product",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-outline" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="products"
            options={{
              title: "Products",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
        </Tabs>
      ) : (
        <Navigator router={TabRouter}>
          <NavBarComponent links={links} isSmallScreen={isSmallScreen} />
          <Slot />
        </Navigator>
      )}
    </ProductDataProvider>
  );
}
