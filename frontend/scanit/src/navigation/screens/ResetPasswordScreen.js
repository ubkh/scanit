import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation } from '@react-navigation/native';

function ResetPasswordScreen(props) {
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
    
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
    
    const onResetPressed = () => {
        console.warn("Reset Successfully")
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset your password</Text>
            
            <CustomInput placeholder = "New pasword" value = {password} setValue = {setPassword}/>
            <CustomInput placeholder = "Confirm new password" value = {confirmPassword} setValue = {setConfirmPassword}/>
            <CustomButton text = "Reset" onPress={onResetPressed}/>
            <CustomButton text = "Back to sign in" onPress={onSignInPressed} type = "TERTIARY"/>
            
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
    text: {
        textAlign: 'center',
    },
});

export default ResetPasswordScreen;