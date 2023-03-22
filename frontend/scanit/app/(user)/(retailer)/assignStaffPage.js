import React, { useState, useContext } from 'react';
import { StyleSheet,Image, useWindowDimensions,Alert } from 'react-native';
import { View, Text, StatusBar, Flex, Spacer, Button, Box, Heading, useColorMode, Center, KeyboardAvoidingView } from 'native-base';

import CustomInput from '../../../components/CustomInput.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;


function AssignStaffPage(props) {
    const { colorMode } = useColorMode();

    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;
    const {control, handleSubmit, watch} = useForm();
    const[number, setNumber] = useState('');
    const[store_address, setStoreAddress] = useState('');
    const router = useRouter();
 
    // const[firstName, setFirstName] = useState('');
    // const[lastName, setLastName] = useState('');
    // const[email, setEmail] = useState('');
    // const[number, setNumber] = useState('');
    const[retailerbarcode, set_retailer_barcode] = useState('');
    // const[password, setPassword] = useState('');
    // const[confirmPassword, setConfirmPassword] = useState('');
    const[error, setError] = useState('');

    const onRegisterPressed = async data =>  {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
            'first_name': data.first_name,
            'last_name': data.last_name,
            'number': number,
            'store_address': store_address,
            // 'retailer_barcode':JSON.parse(localStorage.getItem("retid")),
            'password': data.password
        })

        fetch(`http://${domain}/api/staff/register/`,{
            method: 'POST',
            credentials: "same-origin",
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
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <KeyboardAvoidingView h={{
            base: "400px",
            lg: "auto"
            }} style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
        <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
        <Flex flex={1} alignItems="center" safeAreaTop>
            <Spacer />

            <Box borderWidth={1} borderColor="gray.200" width={"90%"} maxWidth="340px" borderRadius={8} p={4}
                marginTop={1} _dark={{borderColor:"muted.700"}}>
                <Center>
                    <Heading bold>Assign Staff</Heading>
                    <Text>&nbsp;</Text>
                    
                    <Text>&nbsp;</Text>
            
                    <CustomInput 
                        name='first_name'
                        placeholder='First name'
                        control = {control}
                        rules = {{
                            required: 'First name is required',
                        }} 
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
        
        <Text>&nbsp;</Text>
                    <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onRegisterPressed)}>Assign</Button>
                    <Text>&nbsp;</Text>
                </Center>
            </Box>

            <Spacer />
        </Flex>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    errorLabel: {
        width: "100%",
        textAlign: "center",
        color: "red",
    }
});

export default AssignStaffPage;