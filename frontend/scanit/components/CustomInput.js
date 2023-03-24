import React from "react";
import { TextInput, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { View, Text, Input, FormControl, WarningOutlineIcon } from "native-base";
import { Controller } from "react-hook-form";

const CustomInput = ({ defaultValue, control, name, rules = {}, placeholder, secureTextEntry, editable}) => {
    return (
        <Controller     
            control = {control}
            name = {name}
            rules = {rules}
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    {/* <View style = {[styles.container, {borderColor: error ? 'red' : 'white'}]}>
                        {/* <TextInput 
                            value = {value} 
                            onChangeText = {onChange} 
                            onBlur = {onBlur} 
                            placeholder = {placeholder}
                            style = {[styles.input]}
                            secureTextEntry = {secureTextEntry}
                        /> */}
                    {/* </View> */}

                    <View>
                        <FormControl isInvalid={error ? true : false}>
                            <FormControl.Label>{placeholder}</FormControl.Label>
                            <Input width={"300px"}
                                value = {value} 
                                onChangeText = {onChange} 
                                defaultValue = {defaultValue}
                                onBlur = {onBlur} 
                                placeholder = {placeholder}
                                secureTextEntry = {secureTextEntry}
                                editable={editable}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {error && error.message || 'Error'}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </View>
                    {/* {error && (
                        <Text style = {{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )} */}
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