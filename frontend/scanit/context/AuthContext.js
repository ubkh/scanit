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
  const rootSegment = useSegments()[0];
  const router = useRouter();

  React.useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== "(auth)"
    ) {
      // Redirect to the sign-in page.
      router.replace("/signIn");
    } else if (user && rootSegment !== "(user)") {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, rootSegment]);
}

export function AuthProvider(props) {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");
  const [user, setAuth] = useState(undefined);

// Note: this hook causes act() issues in tests - look into this
  React.useEffect(() => {
    getItem().then((json) => {
      //console.log("json", json);
      if (json != null) {
        //console.log("JSON", json)
        //removeItem();
        setAuth(JSON.parse(json));
      } else {
        setAuth(null);
      }
    });
    // const json = getItem();
    // setAuth(json);
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (user) => {
          setAuth(user);
          setItem(JSON.stringify({}));
        },
        signOut: () => {
          setAuth(null);
          removeItem();
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
