import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function ForgotPasswordScreen(props) {
    const[email, setEmail] = useState('');
    const router = useRouter();

    const globalContext = useContext(Context)
    const {domain} = globalContext;

    const {control, handleSubmit} = useForm();
    
    const onSignInPressed = () => {
        router.push("/signIn");
    }
    
    const onSendPressed = async data => {
        let body = JSON.stringify({
            'email': data.email.toLowerCase(),
        })

        fetch(`http://${domain}/api/user/password-reset/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:body
        })
        .then(res => {
            if (res.ok) {
                console.log('A link was sent to your email to reset your password')
                router.push("/signIn");
                return res.json()
            } else {
                setError('Invalid email')
                throw res.json()
            }
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

            <Text style={styles.title}>Reset your password</Text>
            
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
            <CustomButton text = "Send" onPress={handleSubmit(onSendPressed)}/>
            <CustomButton text = "Back to sign in" onPress={onSignInPressed} type = "TERTIARY"/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    text: {
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;