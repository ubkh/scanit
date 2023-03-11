import React, { useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogoInverted.png';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useAuth } from "../../../context/AuthContext";

function SignInScreen(props) {
    const globalContext = useContext(Context)
    const { signIn } = useAuth();
    const { setIsLoggedIn, domain, setToken } = globalContext;
 
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[ error, setError ] = useState('');

    const{height} = useWindowDimensions();
    const router = useRouter();

    function onLoginPressed() {
        let body = JSON.stringify({
            'email': email.toLowerCase(),
            'password': password
        })

        fetch(`http://${domain}/api/user/login/`,{
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
                setError('Invalid credentials')
                throw res.json()
            }
        })
        .then(json => {
            setToken(json.access_token)
            setIsLoggedIn(true)
            signIn(json.user)
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(json.retailer_id))
            
            document.cookie="retid="+JSON.stringify(json.retailer_id)
        })
        .catch(error => {
            console.log(error)
        })
    }
      
    const onForgotPasswordPressed = () => {
        router.push('/forgotPass')
    }
      
    const onSignUpPressed = () => {
        router.push("/signUp");
    }

    return (
        <View style={styles.container}>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>

            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.2}]} 
                resizeMode="contain"
                />
            <Text>&nbsp;</Text>
            <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <Text style={styles.errorLabel}>{error}</Text>
            <CustomButton text = "Sign In" onPress={onLoginPressed}/>
            <CustomButton text = "Forgot Password?" onPress={onForgotPasswordPressed} type = "SECONDARY"/>
            <CustomButton text = "Dont have an account? Create one" onPress={onSignUpPressed} type = "TERTIARY"/>
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

export default SignInScreen;