import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CustomInput from '../../../components/CustomInput.js';
import CustomButton from '../../../components/CustomButton.js';
import { useRouter } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

const SignUpScreen = () =>  {
    const globalContext = useContext(Context)
    const {domain, userID, setUserID} = globalContext;
    const router = useRouter();
    const {control, handleSubmit, watch} = useForm();

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[number, setNumber] = useState('');
    const[storeAddress, setStoreAddress] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const pwd = watch('password');
    const[error, setError] = useState('');

    const onRegisterPressed = async data =>  {
        let body = JSON.stringify({
            'store_address': storeAddress,
            'email': data.email.toLowerCase(),
            'first_name': data.first_name,
            'last_name': data.last_name,
            'number': data.number,
            'password': data.password
        })

        fetch(`http://${domain}/api/user/register/`,{
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
                setError('user already exists')
                throw res.json()
            }
        })
        .then(json => {
            setUserID(json.user_id)
            console.log(json.user_id)
            console.log(userID)
            router.push({pathname: '/verify', params: {user_id: json.user_id}})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    const onAlreadyUserPressed = () => {
        router.push("/signIn");
    }
    
    const onTOUPressed = () => {
        console.warn("dont have any mate")
    }
    
    const onPPPressed = () => {
        console.warn("lol pp")
    }

    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Create an account</Text>
                
                <CustomInput placeholder = "First name" value = {firstName} setValue = {setFirstName}/>
                <CustomInput placeholder = "Last name" value = {lastName} setValue = {setLastName}/>
                <CustomInput placeholder = "Email" value = {email} setValue = {setEmail}/>
                <CustomInput placeholder = "Phone number" value = {number} setValue = {setNumber}/>
                <CustomInput placeholder = "Store Address" value = {storeAddress} setValue = {setStoreAddress}/>
                <CustomInput placeholder = "Password" value = {password} setValue = {setPassword} secureTextEntry/>
                <CustomInput placeholder = "Confirm password" value = {confirmPassword} setValue = {setConfirmPassword} secureTextEntry/>
                <CustomButton text = "Register as Business" onPress={onRegisterPressed}/>
                <Text style = {styles.text}>
                    By registering, you confirm that you accept our <Text style = {styles.link} onPress = {onTOUPressed}>Terms of Use</Text> and <Text style = {styles.link} onPress = {onPPPressed}>Privacy Policy</Text>
                </Text>
                <CustomButton text = "Already have an account? Sign In" onPress={onAlreadyUserPressed} type = "TERTIARY"/>
            </View>
        );
        }

    return (
        <View style={styles.container}>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            
            <Text style={styles.title}>Create an account</Text>
            
            <CustomInput 
                name='first_name'
                placeholder='First name'
                control = {control}
                rules = {{required: 'First name is required'}} 
            />
            <CustomInput 
                name='last_name'
                placeholder='Last name'
                control = {control}
                rules = {{required: 'Last name is required'}} 
            />
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
            <CustomInput 
                name='number'
                placeholder='Phone number'
                control = {control}
                rules = {{
                    required: 'Phone number is required',
                    minLength: {
                        value: 11,
                        message: 'Number can only contain 11 numerals'
                    },
                    maxLength: {
                        value: 11,
                        message: 'Number can only contain 11 numerals'
                    }
                }} 
            />
            <CustomInput 
                name = 'password'
                placeholder = 'Password' 
                control={control} 
                rules = {{
                    required: 'Password is required', 
                    pattern: {
                        value: PASSWORD_REGEX, 
                        message: 'Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character'
                    }
                }} 
                secureTextEntry
            />
            <CustomInput 
                name = 'confirm_password'
                placeholder = 'Confirm password' 
                control={control} 
                rules = {{
                    validate: value => value === pwd || 'Passwords do not match',
                }} 
                secureTextEntry
            />
            <CustomButton text = "Register" onPress={handleSubmit(onRegisterPressed)}/>
            <Text style = {styles.text}>
                By registering, you confirm that you accept our <Text style = {styles.link} onPress = {onTOUPressed}>Terms of Use</Text> and <Text style = {styles.link} onPress = {onPPPressed}>Privacy Policy</Text>
            </Text>
            <CustomButton text = "Already have an account? Sign In" onPress={onAlreadyUserPressed} type = "TERTIARY"/>
        </View>
        
    )
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
    link: {
        color: '#9F1470'
    },
    text: {
        textAlign: 'center',
    },
});

export default SignUpScreen;