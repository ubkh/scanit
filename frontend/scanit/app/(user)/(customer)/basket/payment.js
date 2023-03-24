import React, { useState, useContext } from 'react';
//import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

//import {StatusBar, useColorMode} from 'native-base';
import { View, Container, Text, useColorMode, StatusBar, Input, Heading } from 'native-base';


import { useRouter } from "expo-router";
import { useAuth } from '../../../../context/AuthContext';
import { Context } from '../../../../context/GlobalContext';
import PaymentStyle from '../../../../styles/PaymentPageStyle';



  function CardDetails(props) {

  // Initializing necessary states and contexts
  const { colorMode } = useColorMode();
  const router = useRouter();

  
  const globalContext = useContext(Context);

    // Define state variables for form inputs and destructuring values from useAuth and Context hooks
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const { user } = useAuth();
  const { basketList, setBasketList } = useContext(Context);
  const { total, setTotal } = useContext(Context);
  const { previousPurchases, setPreviousPurchases } = useContext(Context);
  const { retailerBarcodeData, setRetailerBarcodeData } = useContext(Context);
  const { retailerBarcodeType, setRetailerBarcodeType } = useContext(Context);
  const { isRetailerScanned, setRetailerScanned } = useContext(Context);

    // Function to get the current date in DD/MM/YYYY format
  const getFullDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  };

    // Function to get the current time in HH:MM format
  const getFullTime = () => {
    var d = new Date(),
    h = (d.getHours()<10?'0':'') + d.getHours(),
    m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return  h + ':' + m;
  };

    // Function to reset all input fields and context states
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
    setTotal(0);
  };

    // Function to handle changes in the name input field
  const handleNameOnCard = (text) => {
    setName(text.replace(/[^a-z- ]/gi, ''));
  };

    // Function to handle changes in the name input field
  const handleCardNumberChange = (text) => {
    setCardNumber(text.replace(/[^0-9]/g, ''));
  };

    // Function to handle changes in the expiry month input field
  const handleExpiryMonth = (text) => {
    setExpiryMonth(text.replace(/[^0-9]/g, ''));
  };

    // Function to handle changes in the expiry year input field
  const handleExpiryYear = (text) => {
    setExpiryYear(text.replace(/[^0-9]/g, ''));
  };

    // Function to handle changes in the CVV input field
  const handleCvvChange = (text) => {
    setCvv(text.replace(/[^0-9]/g, ''));
  };

    // Define function to handle form submission
  const handleSubmit = async () => {
        // Get current month and year
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();

      // Check if the name input has a length of less than or equal to 3 characters
    if(name.length <= 3){
      Alert.alert('Invalid Name', 'Please enter your full name');
    }
      // Check if the card number input is not exactly 16 characters long
    else if (cardNumber.length !== 16) {
      Alert.alert('Invalid card number', 'Please enter a valid 16-digit card number');
    }
      // Check if the expiry month and year are both less than or equal to the current month and year
    else if(parseInt(expiryMonth) <= currentMonth && parseInt(expiryYear) <= currentYear){
      Alert.alert('Invalid Date', 'Your card may have expired');
    }
      // Check if the expiry month is less than 1 or greater than 12
    else if(parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12){
      Alert.alert('Invalid Month', 'Please enter a valid Month between 1-12');
    }
      // Check if the expiry year is less than the current year or greater than 2100
    else if(parseInt(expiryYear) < currentYear || parseInt(expiryYear) > 2100){
      Alert.alert('Invalid Year', 'Please enter a valid Year between 2023-2099');
    }
      // Check if the CVV input is not exactly 3 characters long
    else if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV');
    } 
      // If all input values are valid, proceed with the payment and create a transaction
    else {
          // Push the user to the Basket and Home screens
      router.push("/basket/Basket");
      router.push("/home")

          // Add the current purchase to the list of previous purchases
      setPreviousPurchases([

        {date: getFullDate(), time: getFullTime(), location: retailerBarcodeData[0].barcode , items: basketList },
        ...previousPurchases
      ])
      console.warn(previousPurchases);

          // Define the data for the transaction
      const transactionData = {
        "shop": retailerBarcodeData[0].id,
        "customer": user.user.user_id,
        "products": globalContext.basketList,
        "amount": globalContext.total
      };
      
      const test = new Date().toISOString().slice(0, 10)

          // Log the transaction data
      console.log(JSON.stringify(transactionData))
      console.log("Body above here")
      console.log(retailerBarcodeData)

          // Send a POST request to create the transaction
      fetch(`http://${globalContext.domain}/api/create-transaction/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      })
      .then(response => console.log(response))
      .then(data => console.log(data))
      .catch(error => console.error(error));
      
      
    // Reset the input fields

      resetFields();
    }
  
  };

  // Render the form component
  return (

    <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
    <View style={PaymentStyle.container}>
      <Input
        style={PaymentStyle.input}
        placeholder="Enter Name on Card"
        value={name}
        onChangeText={handleNameOnCard}
        maxLength={30}
        variant="underlined"
      />
      <Input
        style={PaymentStyle.input}
        placeholder="Enter Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={16}
        variant="underlined"
      />
        <View style = {{flexDirection: "row"}}>
          <View style={{flex:1}}>
            <Input
              style={PaymentStyle.inputMonth}
              placeholder="MM"
              keyboardType="numeric"
              value={expiryMonth}
              onChangeText={handleExpiryMonth}
              maxLength={2}
              variant="underlined"
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
              variant="underlined"
            />
          </View>
        </View>

      <Input
        style={PaymentStyle.input}
        placeholder="Enter CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={handleCvvChange}
        maxLength={3}
        variant="underlined"
      />

      <TouchableOpacity style={PaymentStyle.button} onPress={handleSubmit}>
        <Text style={PaymentStyle.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
}


export default CardDetails;




  
