import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogo.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation } from '@react-navigation/native';

function SignInScreen(props) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const{height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Home');
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
            
            <CustomInput placeholder = "Username" value = {username} setValue = {setUsername}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <CustomButton text = "Sign In" onPress={onSignInPressed}/>
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
});

export default SignInScreen;