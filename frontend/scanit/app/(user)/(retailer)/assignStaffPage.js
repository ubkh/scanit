import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';

function assignStaffPage(props) {
    const { user_id } = useSearchParams();
    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;
    const router = useRouter();
 
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[number, setNumber] = useState('');
    const[storeAddress, setStoreAddress] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[error, setError] = useState('');

    const onRegisterPressed = () => {
        let body = JSON.stringify({
            'email': email.toLowerCase(),
            'first_name': firstName,
            'last_name': lastName,
            'number': number,
            'store_address': storeAddress,
            'password': password,
            'retailer_id':JSON.parse(localStorage.getItem('user'))
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
        <View style={styles.container}>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>

          
            <CustomInput placeholder = "First name" value = {firstName} setValue = {setFirstName}/>
            <CustomInput placeholder = "Last name" value = {lastName} setValue = {setLastName}/>
            <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <Text style={styles.errorLabel}>{error}</Text>
            <CustomButton text = "Assign Staff" onPress={onRegisterPressed}/>
        </View>
    );
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

export default assignStaffPage;