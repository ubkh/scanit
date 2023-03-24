import React, { useState, useContext } from 'react';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, Heading, useColorMode, Center, KeyboardAvoidingView } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, useSearchParams, Link } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

// Define a React component called VerificationScreen
function VerificationScreen(props) {
    // Define two pieces of state using the useState hook
    const[code, setCode] = useState('');
    const[ error, setError ] = useState('');

    // Use the useForm hook from react-hook-form to create a form object
    const {control, handleSubmit} = useForm();

    // Use the useRouter and useColorMode hooks from Expo to get the current route and color mode respectively
    const router = useRouter();
    const { colorMode } = useColorMode();

    // Use the useSearchParams and useContext hooks to get the user_id and domain from the global context respectively
    const { user_id } = useSearchParams();
    const globalContext = useContext(Context)
    const {domain} = globalContext;

    // Define an async function called onConfirmPressed that will make a request to the server to confirm the verification code
    const onConfirmPressed = async data =>  {
        // Create a JSON body with the verification code
        let body = JSON.stringify({
            'verification_code': data.code
        })

        // Make a POST request to the server to confirm the verification code
        fetch(`http://${domain}/api/user/verify/${user_id}/`,{
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
                throw res.json()
            }
        })
        .then(json => {
            // If the verification is successful, navigate to the sign in screen
            console.log("successfully verified!")
            router.push('/signIn')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        // Render the verification screen UI using various components from NativeBase
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
                    <Heading bold>Verify your account</Heading>
                    <Text>&nbsp;</Text>
                    <CustomInput 
                        name='code'
                        placeholder='Code'
                        control = {control}
                        rules = {{required: 'Code is required'}} 
                    />

                    <Text>&nbsp;</Text>
                    <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onConfirmPressed)}>Confirm</Button>
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

export default VerificationScreen;