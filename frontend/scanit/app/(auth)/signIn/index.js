import React, { useState, useContext} from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, useColorMode, Center, KeyboardAvoidingView } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, Link } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useAuth } from "../../../context/AuthContext";
import { useForm } from 'react-hook-form';
import ThemeButton from '../../../components/ThemeButton';
import ScanitLogo from '../../../components/ScanitLogoComponent';

function SignInScreen(props) {
    const { colorMode } = useColorMode();
    const globalContext = useContext(Context)
    const { signIn } = useAuth();
    const { domain } = globalContext;
 
    const[ error, setError ] = useState('');

    const {control, handleSubmit, formState: {errors}} = useForm();
    const{height} = useWindowDimensions();
    const router = useRouter();

    const onLoginPressed = async data =>  {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
            'password': data.password
        })

        fetch(`http://${domain}/api/user/login/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:body
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                setError('Invalid credentials')
                throw res.json()
            }
        })
        .then(json => {
            // setToken(json.access_token)
            // setIsLoggedIn(true)
            // setUserType(json.user.is_retailer ? 'retailer' : 'customer')
            // console.log(json.user.is_retailer)
            // console.log(userType)
            signIn(json)
        })
        .catch(error => {
            console.log(error)
        })
    }
      
    const onForgotPasswordPressed = () => {
        router.push('/signIn/forgotPass')
    }
      
    const onSignUpPressed = () => {
        router.push("/signUp");
    }

    
    return (
        <KeyboardAvoidingView h={{
            base: "400px",
            lg: "auto"
          }} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <Flex flex={1} alignItems="center" safeAreaTop>
            <Spacer />

            <Box borderWidth={1} borderColor="gray.200" width={"90%"} maxWidth="340px" borderRadius={8} p={4}
                marginTop={1} _dark={{borderColor:"muted.700"}}>
                <Center>
                    <ScanitLogo />
                    <Text>&nbsp;</Text>

                    <CustomInput 
                        name='email'
                        placeholder='Email'
                        control = {control}
                        rules = {{required: 'Email is required'}} 
                    />

                    <CustomInput 
                        name = 'password'
                        placeholder = 'Password' 
                        control={control} 
                        rules = {{
                            required: 'Password is required', 
                            minLength: {
                                value: 8, 
                                message: 'Password should contain atleast 8 characters'
                            }
                        }} 
                        secureTextEntry
                    />

                    <Text style={styles.errorLabel}>{error}</Text>
                    <Text>&nbsp;</Text>
                    <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onLoginPressed)}>Sign In</Button>
                    <Text>&nbsp;</Text>
                    <Button variant="outline" width="100%" maxWidth="300px" onPress={onForgotPasswordPressed}>
                        <Text>Forgot Password?</Text>
                    </Button>
                    <Text>&nbsp;</Text>
                    <Text>Don't have an account? <Link style={{fontWeight:"bold"}} href="/signUp">Create one</Link></Text>
                </Center>
            </Box>

            {/* <ThemeButton /> */}
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
    }
});

export default SignInScreen;