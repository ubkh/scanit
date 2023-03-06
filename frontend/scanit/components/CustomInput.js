import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Platform } from 'react-native';


const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    if (Platform.OS === 'web') {
        return (
            <View style={webstyles.container}>
                <TextInput 
                    value = {value}
                    onChangeText = {setValue}
                    placeholder = {placeholder}
                    style={webstyles.input}
                    secureTextEntry = {secureTextEntry}
                    />
            </View>
        );
        }
    return (
        <View style={styles.container}>
            <TextInput 
                value = {value}
                onChangeText = {setValue}
                placeholder = {placeholder}
                style={webstyles.input}
                secureTextEntry = {secureTextEntry}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:  '#e8e8e8',
        width: '100%',

        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        padding: 15,
    },
});

const webstyles = StyleSheet.create({
    container: {
        backgroundColor:  '#e8e8e8',
        width: '50%',

        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        padding: 15,
    },
});

export default CustomInput;