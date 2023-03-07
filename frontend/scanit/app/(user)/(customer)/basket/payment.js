import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from "expo-router";
import { Context } from '../../../../context/GlobalContext';



export default function CardDetails() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();
  const globalContext = useContext(Context);



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
      console.warn('Card details submitted');
      router.push("/Basket");
      globalContext.setBasketList([]);
      setName('');
      setCardNumber('');
      setCvv('');
      setExpiryMonth('');
      setExpiryYear('');
      //resetRetailerBarcode();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name on Card</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name on Card"
        value={name}
        onChangeText={handleNameOnCard}
      />
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={16}
      />
      <Text style={styles.label}>Expiry Date</Text>
        <View style = {{flexDirection: "row"}}>
          <View style={{flex:1}}>
            <TextInput
              style={styles.inputt}
              placeholder="MM"
              keyboardType="numeric"
              value={expiryMonth}
              onChangeText={handleExpiryMonth}
              maxLength={2}
            />
          </View>
          <View style={{flex:1}}>
            <TextInput
              style={styles.inputtt}
              placeholder="YYYY"
              keyboardType="numeric"
              value={expiryYear}
              onChangeText={handleExpiryYear}
              maxLength={4}
            />
          </View>
        </View>

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={handleCvvChange}
        maxLength={3}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputt: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  inputtt: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});




  
