import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogo.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../GlobalContext.js';

function SignUpScreen(props) {
    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[number, setNumber] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[error, setError] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        let body = JSON.stringify({
            'email': email.toLowerCase(),
            'first_name': firstName,
            'last_name': lastName,
            'number': number,
            'password': password
        })

        fetch(`http://192.168.1.253:8000/api/user/register/`,{
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
            navigation.navigate('Verification', { user_id: json.user_id });
        })
        .catch(error => {
            console.log(error)
        })
        // navigation.navigate('Verification');
    }
    
    const onAlreadyUserPressed = () => {
        navigation.navigate('SignIn');
    }
    
    const onTOUPressed = () => {
        console.warn("dont have any mate")
    }
    
    const onPPPressed = () => {
        console.warn("lol pp")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            
            <CustomInput placeholder = "First name" value = {firstName} setValue = {setFirstName}/>
            <CustomInput placeholder = "Last name" value = {lastName} setValue = {setLastName}/>
            <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
            <CustomInput placeholder = "Phone number" value = {number} setValue = {setNumber}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            {/* <CustomInput placeholder = "Confirm password" value = {confirmPassword} setValue = {setConfirmPassword} secureTextEntry/> */}
            <CustomButton text = "Register" onPress={onRegisterPressed}/>
            <Text style = {styles.text}>
                By registering, you confirm that you accept our <Text style = {styles.link} onPress = {onTOUPressed}>Terms of Use</Text> and <Text style = {styles.link} onPress = {onPPPressed}>Privacy Policy</Text>
            </Text>
            <CustomButton text = "Already have an account? Sign In" onPress={onAlreadyUserPressed} type = "TERTIARY"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#72A114',
      alignItems: 'center',
      padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    link: {
        color: '#9F1470'
    },
    text: {
        textAlign: 'center',
    },
});

export default SignUpScreen;