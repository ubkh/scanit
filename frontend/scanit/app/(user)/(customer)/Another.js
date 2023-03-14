// import { useContext } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Context } from '../../../context/GlobalContext';

// function Another(props) {
//     const globalContext = useContext(Context);
//     const { isLoggedIn, logIn } = globalContext;

//     return (
//         <View style={styles.container}>
//             <Text>Another screen!</Text>
//             <Text>You are {(isLoggedIn)? '' : "not "}logged in</Text>
//         </View>
//     );
// }

// // custom css
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     text: {
//       fontSize: 16,
//       lineHeight: 21,
//       fontWeight: 'bold',
//       letterSpacing: 0.25,
//       color: 'white',
//     },
//     button: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingVertical: 12,
//       paddingHorizontal: 32,
//       borderRadius: 4,
//       elevation: 3,
//       backgroundColor: 'orange',
//     },
// });

  
// export default Another;




import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Context } from '../../../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';




const GroceryTrips = () => {
  const { previousPurchases, setPreviousPurchases } = useContext(Context);
  const { basketList, setBasketList } = useContext(Context);


  const removeItem = (index) => {
    Alert.alert(
          'Remove Item',
          'Are you sure you want to delete this item?',
          [
            {
              text: 'Ok',
              onPress: () => {
                console.warn(`Removing item at index ${index} of the basket. Bros too poor lmao`)
                const newList = [...basketList];
                newList.splice(index, 1);
                setBasketList(newList);
              },
              style: 'default',
            },
            {
              text: 'Cancel',
              onPress: () => {
                console.log("Cancelled item remove")
              },
              style: 'cancel',
            },
          ],)
  }


  useEffect(() => {
    
  }, [previousPurchases]);


  return (
    <ScrollView>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Previous Grocery Trips:</Text>
      {previousPurchases.map((trip, index) => (
        <View key={index} style={{ paddingVertical: 5 }}>
          <Text>Date: {trip.date}</Text>
          <Text>Time: {trip.time}</Text>
          <Text>Location: {trip.location}</Text>
          <Text>Items:</Text>
          <View style={{ marginLeft: 20 }}>
            {trip.items.map((item, index) => (
              <><Text key={index}>{item.data}</Text><View style={{ flexDirection: "row", justifyContent: "flex-end" }} key={index}>
                <TouchableOpacity
                  onPress={() => removeItem(index)}
                >
                  <View
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 20,
                      padding: 10,
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={25}
                      color="white" />
                  </View>
                </TouchableOpacity>
              </View></>
            ))}
 
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default GroceryTrips