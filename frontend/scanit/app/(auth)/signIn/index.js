import React, { useState, useContext } from "react";

import { StyleSheet, useWindowDimensions } from "react-native";
import { Text, StatusBar, Flex,Spacer,Button,Box,useColorMode,Center,KeyboardAvoidingView,} from "native-base";
import CustomInput from "../../../components/CustomInput.js";
import { useRouter, Link, SplashScreen } from "expo-router";
import { Context } from "../../../context/GlobalContext.js";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import ScanitLogo from "../../../components/ScanitLogoComponent";

/*Page that creates elements for Sign In functionality, including inputs for email and password,
a fetch request to validate details and forget password button */
function SignInScreen(props) {
  const { colorMode } = useColorMode();
  const globalContext = useContext(Context);
  const { signIn, authenticated } = useAuth();
  const { domain, protocol } = globalContext;

  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { height } = useWindowDimensions();
  const router = useRouter();

  const onLoginPressed = async (data) => {
    let body = JSON.stringify({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    fetch(`${protocol}://${domain}/api/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      credentials: "include",
    })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          return res.json();
        } else {
          setError("Invalid credentials");
          throw res.json();
        }
      })
      .then((json) => {
  
        globalContext.setUserID(json)
        signIn(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onForgotPasswordPressed = () => {
    router.push("/signIn/forgotPass");
  };

  if (authenticated) {
    return (
        <SplashScreen />
    )
  }

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      <Flex flex={1} alignItems="center" safeAreaTop>
        <Spacer />

        <Box
          borderWidth={1}
          borderColor="gray.200"
          width={"90%"}
          maxWidth="340px"
          borderRadius={8}
          p={4}
          marginTop={1}
          _dark={{ borderColor: "muted.700" }}
        >
          <Center>
            <ScanitLogo />
            <Text>&nbsp;</Text>

            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{ required: "Email is required" }}
            />

            <CustomInput
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should contain atleast 8 characters",
                },
              }}
              secureTextEntry
            />

            <Text style={styles.errorLabel}>{error}</Text>
            <Text>&nbsp;</Text>
            <Button
              bg="brand.400"
              width="100%"
              maxWidth="300px"
              onPress={handleSubmit(onLoginPressed)}
            >
              Sign In
            </Button>
            <Text>&nbsp;</Text>
            <Button
              variant="outline"
              width="100%"
              maxWidth="300px"
              onPress={onForgotPasswordPressed}
            >
              <Text>Forgot Password?</Text>
            </Button>
            <Text>&nbsp;</Text>
            <Text>
              Don't have an account?{" "}
              <Link style={{ fontWeight: "bold" }} href="/signUp">
                Create one
              </Link>
            </Text>
          </Center>
        </Box>
        <Spacer />
      </Flex>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    width: "100%",
    textAlign: "center",
    color: "red",
  },
});

export default SignInScreen;
