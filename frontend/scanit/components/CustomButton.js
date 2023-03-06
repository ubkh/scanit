import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import { Platform } from 'react-native';


const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
    if (Platform.OS === 'web') {
        return (
            <Pressable onPress = {onPress} style={[webstyles.container, webstyles[`container_${type}`]]}>
                <Text style = {[webstyles.text, webstyles[`text_${type}`]]}>{text}</Text>
            </Pressable>
        );
    }
    return (
        <Pressable onPress = {onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style = {[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY:{
        backgroundColor:  '#72A114',
    },
    container_SECONDARY:{
        borderColor: '#72A114',
        borderWidth: 2,
    },
    container_TERTIARY: {

    },
    text: {
        fontWeight: 'bold',
    },
    text_PRIMARY: {
        color: 'white',
    },
    text_SECONDARY: {
        color: '#72A114',
    },
    text_TERTIARY: {
        color: 'grey',
    },

    
});

const webstyles = StyleSheet.create({
    container: {
        width: '50%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY:{
        backgroundColor:  '#72A114',
    },
    container_SECONDARY:{
        borderColor: '#72A114',
        borderWidth: 2,
    },
    container_TERTIARY: {

    },
    text: {
        fontWeight: 'bold',
    },
    text_PRIMARY: {
        color: 'white',
    },
    text_SECONDARY: {
        color: '#72A114',
    },
    text_TERTIARY: {
        color: 'grey',
    },

    
});

export default CustomButton