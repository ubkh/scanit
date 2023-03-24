import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text, Box, StatusBar, useColorMode, Heading, Divider, Checkbox } from 'native-base';
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
    const [ successful, setSuccessful ] = useState(false);

    const user = JSON.parse(user_data.user_data);


    const onUpdatePressed = async (data) => {

        const body = {
            'user_id': user.user_id,
            'first_name': data.first_name,
            'last_name': data.last_name,
            'password': data.password,
        };

        await fetch(`http://${domain}/api/retailer/update-staff/`, {
            method: 'POST',
            include: 'credentials',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(res => {
            if (res.ok) setSuccessful(true);
            else setSuccessful(false); 
        })
        .catch(err => {
            console.log(err);
        })

        if (successful) router.push('/manageStaff')

    }
    

    const onBackPressed = () => {

        router.push("/manageStaff");

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
            <Button bg="brand.400" width="100%" maxWidth="300px" onPress={(onBackPressed)} title={"View all staff"}>View all staff</Button>
            
            <Text textAlign={"center"} _web={{textAlign: "start"}}>Edit staff account.</Text>
            
            <Text>&nbsp;</Text>
            <CustomInput 
                name='first_name'
                placeholder='First name'
                defaultValue={user.first_name}
                control = {control}
                />
            <CustomInput 
                name='last_name'
                placeholder='Last name'
                defaultValue={user.last_name}
                control = {control} 
                />
            <CustomInput 
                name='email'
                placeholder='Email'
                defaultValue={user.email}
                control = {control}
                editable={false}
                />

            <CustomInput 
                name = 'password'
                placeholder = 'Password' 
                control={control} 
                rules = {{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password MUST be at least 8 characters'
                    },
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