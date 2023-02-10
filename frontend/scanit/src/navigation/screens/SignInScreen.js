import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogo.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';

const onSignInPressed = () => {
  console.warn("signed in")
}

const onForgotPasswordPressed = () => {
    console.warn("forgot lad")
}

const onSignUpPressed = () => {
    console.warn("tek me")
}

function SignInScreen(props) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const{height} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"
                />
            
            <CustomInput placeholder = "Username" value = {username} setValue = {setUsername}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <CustomButton text = "Sign In" onPress={onSignInPressed}/>
            <CustomButton text = "Forgot Password?" onPress={onForgotPasswordPressed} type = "TERTIARY"/>
            <CustomButton text = "Dont have an account? Create one" onPress={onSignUpPressed} type = "SECONDARY"/>
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
});

export default SignInScreen;