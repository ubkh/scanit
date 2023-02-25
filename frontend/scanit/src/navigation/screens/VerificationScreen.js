import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import { useNavigation, useRoute } from '@react-navigation/native';

function VerificationScreen(props) {
    const[code, setCode] = useState('');
    const[ error, setError ] = useState('');

    const route = useRoute();
    const { user_id } = route.params;
    const navigation = useNavigation();

    const onConfirmPressed = () => {
        let body = JSON.stringify({
            'verification_code': code
        })

        fetch(`http://${domain}/api/user/verify/${user_id}/`,{
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
                throw res.json()
            }
        })
        .then(json => {
            console.log("successfully verified!")
            navigation.navigate('SignIn');
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
    
    const onResendPressed = () => {
        console.warn("are you that slow schmuck")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify your account</Text>
            
            <CustomInput placeholder = "Code" value = {code} setValue = {setCode}/>
            <CustomButton text = "Confirm" onPress={onConfirmPressed}/>
            <CustomButton text = "Resend code" onPress={onResendPressed} type = "SECONDARY"/>
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

export default VerificationScreen;