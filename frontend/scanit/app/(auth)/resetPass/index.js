import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter } from "expo-router";

function ResetPasswordScreen(props) {
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    
    const onSignInPressed = () => {
        router.push("/signIn");
    }
    
    const onResetPressed = () => {
        console.warn("Reset Successfully")
        router.push("/signIn");
    }

    return (
        <View style={styles.container}>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>

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