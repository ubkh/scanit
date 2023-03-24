import { useRouter, useSegments, usePathname } from "expo-router";
import React, { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";



const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const { getItem, setItem, removeItem } = useAsyncStorage("LAST_ROUTE");
  const segments = useSegments();
  const router = useRouter();
  const path = usePathname();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user && !inAuthGroup
    ) {
      // Save the current route to AsyncStorage.
      setItem(JSON.stringify(path));
      // Redirect to the sign-in page.
      router.replace("/signIn");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      //removeItem();
      getItem().then((lastRouteJson) => {
        const lastRoute = JSON.parse(lastRouteJson);

        if (lastRouteJson != null && lastRoute !== "/--") {
          router.replace(lastRoute);
          removeItem(); // Clear the last route from AsyncStorage.
        } else {
          router.replace("/");
        }
      });
    }
  }, [user, segments]);
}

export function AuthProvider(props) {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");
  const { removeItem: removeLastRoute } = useAsyncStorage("LAST_ROUTE");
  const [user, setAuth] = useState(undefined);
  const [ userType, setUserType ] = useState(undefined);
  const [authenticated, setAuthenticated] = useState(false);

  // React.useEffect(() => {
  //   setAuthenticated(true); // temp to deal with when user is undefined on reload
  //   getItem().then((json) => {
  //     if (json != null) {
  //       const parsed = JSON.parse(json);
  //       //removeItem();
  //       // console.log("parsed is ")
  //       // console.log(parsed)
  //       setAuth(parsed);

  //       // setUserType(parsed.user.is_retailer ? 'retailer' : 'customer')

  //       if (parsed.user.account_type === 1) { // CUSTOMER 
  //         setUserType('customer');
  //       } else if (parsed.user.account_type === 2) { // RETAIL STAFF
  //         setUserType('retailer');
  //       } else if (parsed.user.account_type === 3){ // RETAIL OWNER
  //         setUserType('retailer');
  //       } else { // DIRECTOR
  //         setUserType('director');
  //       }

  //     } else {
  //       setAuth(null);
  //       setUserType(undefined)
  //       setAuthenticated(false);
  //     }
  //   });
  //   const json = getItem();
  //   setAuth(json);
  // }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (json) => {
          setAuth(json);
          setItem(JSON.stringify(json));
          // setUserType(json.user.is_retailer ? 'retailer' : 'customer')
          removeLastRoute();

          // console.log("reece st john commey : " + json.user.employed_at_id)

          if (json.user.account_type === 1) {
            setUserType('customer');
          } else if (json.user.account_type === 2) {
            setUserType('retailer');
          } else if (json.user.account_type === 3) {
            setUserType('retailer');
          } else {
            setUserType('director');
          }

        },
        signOut: () => {
          setAuth(null);
          removeItem();
          setUserType(undefined);
          removeLastRoute();
          setAuthenticated(false);;
        },
        user,
        userType,
        authenticated
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
