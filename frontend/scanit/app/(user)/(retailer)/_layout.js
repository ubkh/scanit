import { Slot, Navigator, Tabs, useSegments, Redirect } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import { useColorMode } from "native-base";
import { TabRouter } from "@react-navigation/native";
import NavBarComponent from "../../../components/NavBarComponent";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import ProductDataProvider from "../../../context/RetailerProductContext";

// if (user.user.account_type == 1) { // THEY ARE RETAIL STAFF
//   const links = [
//     { label: "Home", url: "/(retailer)/home" },
//     { label: "Products", url: "/products" },
//     { label: "Add a Product", url: "/addProduct" },
//     { label: "Account", url: "/account" },
//   ];
// } else if (user.user.account_type == 2) { // THEY ARE RETAIL OWNER
//   const links = [
//     { label: "Home", url: "/(retailer)/home" },
//     { label: "Products", url: "/products" },
//     { label: "Add a Product", url: "/addProduct" },
//     { label: "Assign Staff", url: "/assignStaff" },
//     { label: "Manage Staff", url: "/manageStaff" },
//     { label: "Account", url: "/account" },
//   ];
// } else if (user.user.account_type == 4) { // THEY ARE A DIRECTOR
//   // TODO: ADD URLS
//   const links = [];
// }

const links = [
  { label: "Home", url: "/(retailer)/home" },
  { label: "Products", url: "/products" },
  { label: "Add a Product", url: "/addProduct" },
  { label: "Assign Staff", url: "/assignStaff" },
  { label: "Manage Staff", url: "/manageStaff" },
  // { label: "edit", url: "/editStaff" },
  { label: "Account", url: "/account" },
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
            name="addProduct"
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
                <Ionicons name="list-outline" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="assignStaff"
            options={{
              title: "Assign Staff",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-add-outline" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="account"
            options={{
              title: "Account",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" color={color} size={size} />
              ),
            }}
          ></Tabs.Screen>
        </Tabs>
      ) : (
        <Navigator router={TabRouter}>
          <NavBarComponent links={links} />
          <Slot />
        </Navigator>
      )}
    </ProductDataProvider>
  );
}
