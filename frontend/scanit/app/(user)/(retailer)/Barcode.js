import React, {useState} from 'react';
import { View, Text, Heading } from 'native-base';
import ContainerStyle from '../../../styles/ContainerStyle';

import Barcode from 'react-barcode';

function Barcodes(props){
    const [value, setValue] = useState('');

    const setValueBarcode =() =>{
        setValue("123456789");
    };

    return(
        <View style={ContainerStyle.container}>
            <Barcode value={value} />
            <button onClick={setValueBarcode}>Generate Barcode</button>
        </View>
    );
}

export default Barcodes;
