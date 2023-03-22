import React, { useState, useContext } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { View,  Text, useColorMode, StatusBar,Input } from 'native-base';
import { useRouter } from "expo-router";
import { Context } from '../../../../context/GlobalContext';
import PaymentStyle from '../../../../styles/PaymentPageStyle';



  function CardDetails(props) {

  const { colorMode } = useColorMode();
  const router = useRouter();


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
    if(name.length <= 3){
      Alert.alert('Invalid Name', 'Please enter your full name');
    }
    else if (cardNumber.length !== 16) {
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




  
