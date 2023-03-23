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

  React.useEffect(() => {
    setAuthenticated(true); // temp to deal with when user is undefined on reload
    getItem().then((json) => {
      if (json != null) {
        const parsed = JSON.parse(json);
        //removeItem();
        setAuth(parsed);
        setUserType(parsed.user.is_retailer ? 'retailer' : 'customer')
      } else {
        setAuth(null);
        setUserType(undefined)
        setAuthenticated(false);
      }
    });
    const json = getItem();
    setAuth(json);
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (json) => {
          setAuth(json);
          setItem(JSON.stringify(json));
          setUserType(json.user.is_retailer ? 'retailer' : 'customer')
          removeLastRoute();
        },
        signOut: () => {
          setAuth(null);
          removeItem();
          setUserType(undefined);
          set
          removeLastRoute();
          setAuthenticated(false);
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
