import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/ScanItLogo.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation } from '@react-navigation/native';

function SignUpScreen(props) {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[number, setNumber] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('Verification');
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
            
            <CustomInput placeholder = "Username" value = {username} setValue = {setUsername}/>
            <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
            <CustomInput placeholder = "Phone number" value = {number} setValue = {setNumber}/>
            <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
            <CustomInput placeholder = "Confirm password" value = {confirmPassword} setValue = {setConfirmPassword} secureTextEntry/>
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