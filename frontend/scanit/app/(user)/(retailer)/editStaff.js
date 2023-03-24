import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';

const editStaff = (props) => {

    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;
    const {control, handleSubmit, watch} = useForm();
    const[number, setNumber] = useState('');
    const[store_address, setStoreAddress] = useState('');
    const { colorMode } = useColorMode();
    
    // const { user } = useAuth().user;
    const router = useRouter();
    // const [ user_data ] = useSearchParams();
    const user_data = useSearchParams()
    const string_user = user_data.user_data
    console.log(string_user)
    console.log(JSON.stringify(user_data.user_data))
    
    // const { params } = useRoute();
    // const user_data = JSON.parse(params.user_data);
    // console.log(user_data);
    
    const onUpdatePressed = async data =>  {
        let body = JSON.stringify({
        'email': data.email.toLowerCase(),
        'first_name': data.first_name,
        'last_name': data.last_name,
        'password': data.password,
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
    <Box _dark={{ bg: "black" }} flex={1} _light={{ bg: "white" }} safeAreaTop>
    <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
        />

    <Heading size="lg" style={{ fontFamily: "Rubik-Bold" }}
        fontSize={30}
        bold
        justifyContent="flex-start"
        alignSelf={"center"}
        _web={{ mb: "5", mt:"5", mx:"8", alignSelf:"flex-start" }}>
      Edit Staff
    </Heading>

    <View mx="8">
        
        <Text textAlign={"center"} _web={{textAlign: "start"}}>Edit staff account.</Text>
        
        <Text>&nbsp;</Text>
        <CustomInput 
            name='first_name'
            placeholder='First name'
            defaultValue={props.first_name}
            control = {control}
            rules = {{required: 'First name is required'}} 
            />
        <CustomInput 
            name='last_name'
            placeholder='Last name'
            defaultValue={props.last_name}
            control = {control}
            rules = {{required: 'Last name is required'}} 
            />
        <CustomInput 
            name='email'
            placeholder='Email'
            defaultValue={props.email}
            control = {control}
            rules = {{
                required: 'Email is required',
            }} 
            />

        <CustomInput 
            name = 'password'
            placeholder = 'Password' 
            defaultValue={props.password}
            control={control} 
            rules = {{
                required: 'Password is required', 
                // pattern: {
                    //     value: PASSWORD_REGEX, 
                    //     message: 'Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character'
                    // }
                }} 
                secureTextEntry
                />
        <Text>&nbsp;</Text>
        <Button bg="brand.400" width="100%" maxWidth="300px" onPress={handleSubmit(onUpdatePressed)} title={"Edit staff"}>Confirm changes</Button>
        <Text>&nbsp;</Text>
        </View>
    </Box>
    
    )

};

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

export default editStaff;