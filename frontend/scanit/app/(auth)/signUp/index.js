import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, Heading, useColorMode, Center, KeyboardAvoidingView } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, Link } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

const SignUpScreen = () =>  {
    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;
    const router = useRouter();
    const { colorMode } = useColorMode();

    const {control, handleSubmit, watch} = useForm();

    const pwd = watch('password');
    const[error, setError] = useState('');

    const onRegisterPressed = async data =>  {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
            'first_name': data.first_name,
            'last_name': data.last_name,
            'number': data.number,
            'password': data.password
        })

        fetch(`http://${domain}/api/user/register/`,{
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
                setError('user already exists')
                throw res.json()
            }
        })
        .then(json => {
            setUserID(json.user_id)
            console.log(json.user_id)
            console.log(userID)
            router.push({pathname: '/signUp/verify', params: {user_id: json.user_id}})
        })
        .catch(error => {
            console.log(error)
        })
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
                    <Heading bold>Create an account</Heading>
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
        </KeyboardAvoidingView>  
    );
}

export default SignUpScreen;