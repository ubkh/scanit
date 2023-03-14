import React, { useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, TextInput } from 'react-native';
import Logo from '../../../assets/ScanItLogoInverted.png';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useAuth } from "../../../context/AuthContext";
import { useForm } from 'react-hook-form';

function SignInScreen(props) {
    const globalContext = useContext(Context)
    const { signIn } = useAuth();
    const { setIsLoggedIn, domain, setToken } = globalContext;
 
    const[ error, setError ] = useState('');

    const {control, handleSubmit, formState: {errors}} = useForm();
    const{height} = useWindowDimensions();
    const router = useRouter();

    const onLoginPressed = async data =>  {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
            'password': data.password
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
            setToken(json.access_token)
            setIsLoggedIn(true)
            signIn(json.user)
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

            <CustomInput 
                name='email'
                placeholder='Email'
                control = {control}
                rules = {{required: 'Email is required'}} 
            />
            
            <CustomInput 
                name = 'password'
                placeholder = 'Password' 
                control={control} 
                rules = {{
                    required: 'Password is required', 
                    minLength: {
                        value: 8, 
                        message: 'Password should contain at least 8 characters'
                    }
                }} 
                secureTextEntry
            />

            <Text style={styles.errorLabel}>{error}</Text>
            <CustomButton text = "Sign In" onPress={handleSubmit(onLoginPressed)}/>
            <CustomButton text = "Forgot Password?" onPress={onForgotPasswordPressed} type = "SECONDARY"/>
            <CustomButton text = "Don't have an account? Create one" onPress={onSignUpPressed} type = "TERTIARY"/>
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