import React, { useState, useContext } from 'react';
//import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

//import {StatusBar, useColorMode} from 'native-base';
import { View, Container, Text, useColorMode, StatusBar,Input } from 'native-base';


import { useRouter } from "expo-router";
import { Context } from '../../../../context/GlobalContext';
import PaymentStyle from '../../../../styles/PaymentPageStyle';



  function CardDetails(props) {

    const { colorMode } = useColorMode();


  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const { basketList, setBasketList } = useContext(Context);
  const { previousPurchases, setPreviousPurchases } = useContext(Context);
  const { retailerBarcodeData, setRetailerBarcodeData } = useContext(Context);
  const { retailerBarcodeType, setRetailerBarcodeType } = useContext(Context);
  const { isRetailerScanned, setRetailerScanned } = useContext(Context);



  const router = useRouter();

  const getFullDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;

  };

  const getFullTime = () => {
 
    var d = new Date(),
    h = (d.getHours()<10?'0':'') + d.getHours(),
    m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return  h + ':' + m;

  };

  const resetFields =() => {
    setBasketList([]);
    setRetailerScanned(false);
    setRetailerBarcodeData(null);
    setRetailerBarcodeType(null);
    setName('');
    setCardNumber('');
    setCvv('');
    setExpiryMonth('');
    setExpiryYear('');
  };

  const handleNameOnCard = (text) => {
    setName(text.replace(/[^a-z- ]/gi, ''));
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleExpiryMonth = (text) => {
    setExpiryMonth(text.replace(/[^0-9]/g, ''));
  };

  const handleExpiryYear = (text) => {
    setExpiryYear(text.replace(/[^0-9]/g, ''));
  };

  const handleCvvChange = (text) => {
    setCvv(text.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = () => {
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    if (cardNumber.length !== 16) {
      Alert.alert('Invalid card number', 'Please enter a valid 16-digit card number');
    }
    else if(parseInt(expiryMonth) <= currentMonth && parseInt(expiryYear) <= currentYear){
      Alert.alert('Invalid Date', 'Your card may have expired');
    }
    else if(parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12){
      Alert.alert('Invalid Month', 'Please enter a valid Month between 1-12');
    }
    else if(parseInt(expiryYear) < currentYear || parseInt(expiryYear) > 2100){
      Alert.alert('Invalid Year', 'Please enter a valid Year between 2023-2099');
    }
    else if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV');
    } 
    else {
      console.log('Payment successful');
      //console.warn('Card details submitted');
      router.push("/basket/Basket");
      router.push("/home")
      console.warn(basketList);
      setPreviousPurchases([

        {date: getFullDate(), time: getFullTime(), location: retailerBarcodeData , items: basketList },
        ...previousPurchases
      ])
      console.warn(previousPurchases)
      resetFields();
    }
  
  };

  return (

    <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>

    <View style={PaymentStyle.container}>
      <Text style={PaymentStyle.label}>Name on Card</Text>
      <Input
        style={PaymentStyle.input}
        placeholder="Enter Name on Card"
        value={name}
        onChangeText={handleNameOnCard}
        maxLength={30}
      />
      <Text style={PaymentStyle.label}>Card Number</Text>
      <Input
        style={PaymentStyle.input}
        placeholder="Enter card number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={16}
      />
      <Text style={PaymentStyle.label}>Expiry Date</Text>
        <View style = {{flexDirection: "row"}}>
          <View style={{flex:1}}>
            <Input
              style={PaymentStyle.inputMonth}
              placeholder="MM"
              keyboardType="numeric"
              value={expiryMonth}
              onChangeText={handleExpiryMonth}
              maxLength={2}
            />
          </View>
          <View style={{flex:1}}>
            <Input
              style={PaymentStyle.inputYear}
              placeholder="YYYY"
              keyboardType="numeric"
              value={expiryYear}
              onChangeText={handleExpiryYear}
              maxLength={4}
            />
          </View>
        </View>

      <Text style={PaymentStyle.label}>CVV</Text>
      <Input
        style={PaymentStyle.input}
        placeholder="Enter CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={handleCvvChange}
        maxLength={3}
      />

      <TouchableOpacity style={PaymentStyle.button} onPress={handleSubmit}>
        <Text style={PaymentStyle.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   inputMonth: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     justifyContent: 'flex-start',
//   },
//   inputYear: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     justifyContent: 'flex-end',
//   },
//   button: {
//     backgroundColor: '#50C878',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

CardDetails.displayName = 'CardDetails';

export default CardDetails;




  
