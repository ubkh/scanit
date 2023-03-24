import React, { useState, useContext, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, Heading, useColorMode, Center, KeyboardAvoidingView, ScrollView } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, Link } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

// Define regular expressions for email and password validation
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

function SignUpScreen (props) {
    // Use hooks to access the global context and routing utilities
    const globalContext = useContext(Context)
    const {domain, protocol, userID, setUserID} = globalContext;
    const router = useRouter();
    // Use hooks to access the current color mode and form data

    const { colorMode } = useColorMode();

    // Use hooks to keep track of the selected button index and any form errors
    const {control, handleSubmit, watch} = useForm();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const pwd = watch('password');
    const[error, setError] = useState('');

    // Define a function to handle form submission
    const onRegisterPressed = async data =>  {

        // Construct a JSON body to send in a POST request to the API
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
            'first_name': data.first_name,
            'last_name': data.last_name,
            'number': data.number,
            'store_address': data.store_address,
            'store_name': data.store_name,
            'store_description': data.store_description,
            'password': data.password,
            'account_type': selectedIndex == 1 ? 3 : 1 // 1 == CUSTOMER, 3 == RETAIL_OWNER
        })
        fetch(`${protocol}://${domain}/api/user/register/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:body
        })

        // If the request is successful, parse the JSON response and redirect to the verification page
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
            
                // If the request is not successful, display an error message and throw an error to trigger the catch block
                setError('user already exists')
                throw res.json()
            }
        })

        .then(json => {
            setUserID(json.user_id)
            router.push({pathname: '/signUp/verify', params: {user_id: json.user_id}})
        })
        .catch(error => {
             // Handle any errors that occur during the request
            console.log(error)
        })
    }

    return (
        // Using KeyboardAvoidingView to make sure keyboard doesn't block input fields on smaller screens
        <KeyboardAvoidingView h={{
            base: "400px",
            lg: "auto"
            }} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <ScrollView>
        <Flex flex={1} alignItems="center" safeAreaTop>
            <Spacer />

            <Box borderWidth={1} borderColor="gray.200" width={"90%"} maxWidth="340px" borderRadius={8} p={4}
                marginTop={1} _dark={{borderColor:"muted.700"}}>
                <Center>
                    <Heading bold>Create an account</Heading>
                    <Text>&nbsp;</Text>
                    <Button.Group isAttached rounded={"md"} colorScheme="gray" mx={{
                        base: "auto",
                        md: 0
                    }} size="sm"
                    selectedIndex={selectedIndex}
                    >
                        <Button onPress={() => setSelectedIndex(0)} variant={selectedIndex==0 ?'solid' : 'outline'}>Customer</Button>
                        <Button onPress={() => setSelectedIndex(1)} variant={selectedIndex==1 ? 'solid' : 'outline'}>Retailer</Button>
                    </Button.Group>
                    <Text>&nbsp;</Text>
                    <CustomInput 
                        name='first_name'
                        placeholder='First name'
                        control = {control}
                        rules = {{required: 'First name is required'}} 
                    />
                    <CustomInput 
                        name='last_name'
                        placeholder='Last name'
                        control = {control}
                        rules = {{required: 'Last name is required'}} 
                    />
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
                    <CustomInput 
                        name='number'
                        placeholder='Phone number'
                        control = {control}
                        rules = {{
                            required: 'Phone number is required',
                            minLength: {
                                value: 11,
                                message: 'Number can only contain 11 numerals'
                            },
                            maxLength: {
                                value: 11,
                                message: 'Number can only contain 11 numerals'
                            }
                        }} 
                    />
                    {selectedIndex == 1 &&
                        <CustomInput 
                            name = 'store_address'
                            placeholder = 'Store address' 
                            control={control} 
                            rules = {{
                                required: 'Address is required', 
                            
                            }} 
                        />  
                    }
                    {selectedIndex == 1 &&
                        <CustomInput 
                            name = 'store_name'
                            placeholder = 'Store name' 
                            control={control} 
                            rules = {{
                                required: 'Name is required', 
                            
                            }} 
                        />  
                    }
                    {selectedIndex == 1 &&
                        <CustomInput 
                            name = 'store_description'
                            placeholder = 'Store description' 
                            control={control} 
                            rules = {{
                                required: 'description is required', 
                            
                            }} 
                        />  
                    }
                    <CustomInput 
                        name = 'password'
                        placeholder = 'Password' 
                        control={control} 
                        rules = {{
                            required: 'Password is required', 
                            pattern: {
                                value: PASSWORD_REGEX, 
                                message: 'Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character'
                            }
                        }} 
                        secureTextEntry
                    />
                    <CustomInput 
                        name = 'confirm_password'
                        placeholder = 'Confirm password' 
                        control={control} 
                        rules = {{
                            validate: value => value === pwd || 'Passwords do not match',
                        }} 
                        secureTextEntry
                    />
                    <Text>&nbsp;</Text>
                    <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onRegisterPressed)}>Sign Up</Button>
                    <Text>&nbsp;</Text>
                    <Text>Already have an account? <Link style={{fontWeight:"bold"}} href="/signIn">Sign in</Link></Text>
                </Center>
            </Box>
            <Spacer />
        </Flex>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignUpScreen;