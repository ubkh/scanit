import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, Heading, useColorMode, Center, KeyboardAvoidingView } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, Link } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function ForgotPasswordScreen(props) {
    // Setting initial state and declaring required variables
    const[email, setEmail] = useState('');
    const router = useRouter();
    const { colorMode } = useColorMode(); // Getting the color mode of the app (dark or light)


    const globalContext = useContext(Context)// Accessing the global state

    const {domain} = globalContext;// Getting the domain from the global state


    const {control, handleSubmit} = useForm();// Initializing the useForm hook to handle form validation

    // Creating a JSON object with the email entered by the user
    const onSendPressed = async data => {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
        })

        // Sending a POST request to the backend API with the email entered by the user
        fetch(`http://${domain}/api/user/password-reset/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:body
        })
        .then(res => {
            if (res.ok) {
                console.log('A link was sent to your email to reset your password')
                router.push("/signIn");// Navigating to the sign-in page if the email is valid
                return res.json()
            } else {
                setError('Invalid email')// Setting an error message if the email is invalid
                throw res.json()
            }
        })
        .catch(error => {
            console.log(error)// Logging the error in the console
        })
    }

    // Rendering the Forgot Password screen
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
                    <Heading bold>Reset your password</Heading>
                    <Text>&nbsp;</Text>
                    <CustomInput 
                        name='email'
                        placeholder='Email'
                        control = {control}
                        rules = {{
                            required: 'Email is required',
                            pattern: {
                                value: EMAIL_REGEX, 
                                message: 'Not a valid email'
                            }
                        }} 
                    />

                    <Text>&nbsp;</Text>
                    <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onSendPressed)}>Reset</Button>
                </Center>
            </Box>
            <Text>&nbsp;</Text>
            {Platform.OS === 'web' &&
            <Text><Link style={{fontWeight:"bold"}} href="/signIn">Back to Sign In</Link></Text>}
            <Spacer />
            <Spacer />
        </Flex>
        </KeyboardAvoidingView>
    );
}

export default ForgotPasswordScreen;