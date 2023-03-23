import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
// import CustomButton from '../../../../components/CustomButton.js';
import ItemLoader from '../../../../components/ItemLoader.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';
// import * as XLSX from "xlsx";

function loadProducts(props) {

    // const router = useRouter();
    // const { user_id } = useSearchParams();
    const globalContext = useContext(Context);
    const {control, handleSubmit} = useForm();
    // const { domain } = globalContext;

    const onSubmit = async data => {

        // let body = JSON.stringify({
        // })
        

    }
    
    return (
        <View style={styles.container}>
            <Text>&nbsp;</Text>
            <Text>&nbsp;</Text>
            {/* <Text>&nbsp;The format of your file (.xlsx / .csv) MUST be a table with the following headers: barcode, name, description, price, quantity, expiry.</Text> */}
            <Text>&nbsp;The format of your file (.xlsx OR .csv) MUST be a table with the following headers:</Text>
            <Text>&nbsp;</Text>
            <Text>&nbsp;barcode, name, description, price, quantity, expiry</Text>
            <Text>&nbsp;</Text>
            
            
            <ItemLoader/>
            {/* <CustomButton text = "Submit" onPress={handleSubmit(onSubmit())}/> */}
        </View>
    );


    

    // const onConfirmPressed = async data =>  {
    //     let body = JSON.stringify({
    //         'verification_code': data.codehead
    //     })

    //     fetch(`http://${domain}/api/user/verify/${user_id}/`,{
    //         method: 'POST',
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         body:body
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             throw res.json()
    //         }
    //     })
    //     .then(json => {
    //         console.log("successfully verified!")
    //         router.push('/signIn')
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
    
    // const onSignInPressed = () => {
    //     router.push('/signIn')
    // }

    // return (
    //     <View style={styles.container}>
    //         <Text>&nbsp;</Text>
    //         <Text>&nbsp;</Text>
    //         <Text>&nbsp;</Text>
            
    //         <Text style={styles.title}>Verify your account</Text>
            
    //         <CustomInput 
    //             name='code'
    //             placeholder='Code'
    //             control = {control}
    //             rules = {{required: 'Code is required'}} 
    //         />
    //         <CustomButton text = "Confirm" onPress={handleSubmit(onConfirmPressed)}/>
    //         <CustomButton text = "Back to sign in" onPress={onSignInPressed} type = "TERTIARY"/>
            
    //     </View>
    // );

    

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

export default loadProducts;