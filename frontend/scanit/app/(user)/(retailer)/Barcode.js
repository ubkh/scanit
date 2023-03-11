import React, {useState} from 'react';
import { View, Text, Heading } from 'native-base';
import ContainerStyle from '../../../styles/ContainerStyle';
import CustomButton from '../../../components/CustomButton.js';
import Barcode from 'react-barcode';

function Barcodes(props){
    const [value, setValue] = useState('');

    let userDetails = JSON.parse(localStorage.getItem('user'));

    const setValueBarcode =() =>{
        setValue(userDetails);
    };

   

    return(
        <View style={ContainerStyle.container}>
            <Barcode value={value} />
            <CustomButton text = "My Retail Barcode" onPress={setValueBarcode}/> 
        </View>
    );
}

export default Barcodes;
