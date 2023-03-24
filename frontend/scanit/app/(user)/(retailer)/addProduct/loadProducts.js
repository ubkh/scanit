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

export default loadProducts;