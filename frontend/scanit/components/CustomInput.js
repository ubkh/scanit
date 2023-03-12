import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Platform } from 'react-native';


// const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
//     if (Platform.OS === 'web') {
//         return (
//             <View style={webstyles.container}>
//                 <TextInput 
//                     value = {value}
//                     onChangeText = {setValue}
//                     placeholder = {placeholder}
//                     style={webstyles.input}
//                     secureTextEntry = {secureTextEntry}
//                     />
//             </View>
//         );
//         }
//     return (
//         <View style={styles.container}>
//             <TextInput 
//                 value = {value}
//                 onChangeText = {setValue}
//                 placeholder = {placeholder}
//                 style={webstyles.input}
//                 secureTextEntry = {secureTextEntry}
//                 />
//         </View>
import { Controller } from "react-hook-form";

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry}) => {
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