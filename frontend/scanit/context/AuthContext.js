import { useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/signIn");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function AuthProvider(props) {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");
  const [user, setAuth] = useState(undefined);
  const [ userType, setUserType ] = useState(undefined);

  // React.useEffect(() => {
  //   getItem().then((json) => {
  //     //console.log("json", json);
  //     if (json != null) {
  //       const parsed = JSON.parse(json);

  //       //removeItem();
  //       setAuth(parsed);
  //       setUserType(parsed.user.is_retailer ? 'retailer' : 'customer')
  //     } else {
  //       setAuth(null);
  //       setUserType(undefined)
  //     }
  //   });
  //   // const json = getItem();
  //   // setAuth(json);
  // }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (json) => {
          setAuth(json);
          setItem(JSON.stringify(json));
          setUserType(json.user.is_retailer ? 'retailer' : 'customer')
        },
        signOut: () => {
          setAuth(null);
          removeItem();
          setUserType(undefined)
        },
        user,
        userType,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
