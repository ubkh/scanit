import React, { useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogo.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../GlobalContext.js';

function SignInScreen(props) {
    const globalContext = useContext(Context)
    const { setIsLoggedIn, domain, userID, setUserID, setToken } = globalContext;
 
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[ error, setError ] = useState('');

    const{height} = useWindowDimensions();
    const navigation = useNavigation();

    function onLoginPressed() {
        let body = JSON.stringify({
            'email': email.toLowerCase(),
            'password': password
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
            setToken(json.token)
            setIsLoggedIn(true)
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error)
        })
    }
      
    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword')
    }
      
    const onSignUpPressed = () => {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"
                />
            
            <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <Text style={styles.errorLabel }>{error}</Text>
            <CustomButton text = "Sign In" onPress={onLoginPressed}/>
            <CustomButton text = "Forgot Password?" onPress={onForgotPasswordPressed} type = "SECONDARY"/>
            <CustomButton text = "Dont have an account? Create one" onPress={onSignUpPressed} type = "TERTIARY"/>
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

export default SignInScreen;