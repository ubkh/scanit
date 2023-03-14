import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Controller } from "react-hook-form";

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry}) => {
    if (Platform.OS === 'web') {
        return (
            <Controller     
            control = {control}
            name = {name}
            rules = {rules}
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style = {[webstyles.container, {borderColor: error ? 'red' : 'white'}]}>
                        <TextInput 
                            value = {value} 
                            onChangeText = {onChange} 
                            onBlur = {onBlur} 
                            placeholder = {placeholder}
                            style = {[webstyles.input]}
                            secureTextEntry = {secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style = {{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
                
            )}
        />
        );
        }
    return (
        <Controller     
            control = {control}
            name = {name}
            rules = {rules}
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style = {[styles.container, {borderColor: error ? 'red' : 'white'}]}>
                        <TextInput 
                            value = {value} 
                            onChangeText = {onChange} 
                            onBlur = {onBlur} 
                            placeholder = {placeholder}
                            style = {[styles.input]}
                            secureTextEntry = {secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style = {{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
                
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:  '#e8e8e8',
        width: '100%',

        borderWidth: 1,
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