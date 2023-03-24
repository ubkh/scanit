import BarCodeScanComponent from "../../../../components/BarCodeScanComponent";
import { View, Center, Text, useColorMode} from "native-base";
import { Context } from "../../../../context/GlobalContext";
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Alert} from 'react-native';

import NumericInput from 'react-native-numeric-input';


export default function Scan() {
    const globalContext = useContext(Context);
    const { colorMode } = useColorMode();

    const [quantityCounter, setQuantityCounter] = useState(<Text> a </Text>);
    const { quantityValue, setQuantityValue} = globalContext;
    const { isRetailerScanned } = globalContext;


    useEffect(() => {
        if (isRetailerScanned){
            setQuantityCounter(
                <View>
                <NumericInput
                    //key={`${item.data}`}
                    value={quantityValue}
                    onChange={value => {
                    if (value > 0) {
                      setQuantityValue(value);
                      //handleQuantityChange(index, value);
                    }
                    else {
                          Alert.alert(
                                  'Enter a valid quantity',
                                  'Quantity must be 1 or more!',
                                  [
                                    {
                                      text: 'Ok',
                                      style: 'default',
                                    },
                                  ],
                                )
                              }
                            }} 
                    minValue={1}
                    rounded={true}
                    textColor={colorMode === 'light' ? 'black' : 'white'}
                    totalHeight={40}
                    totalWidth={100}
                    />
                  </View>
              )
        }
        else{
            setQuantityCounter(<Text> </Text>);
        }

      }, [quantityValue], colorMode);

    return (
        <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
            <Center alignSelf="center">
                <BarCodeScanComponent />
                <View style = {styles.counterContainer}>
                {quantityCounter}
                </View>
            </Center>
        </View>
    )
}

const styles = StyleSheet.create({

    counterContainer: {
      position: "absolute",
      bottom: 70,
    },

});
