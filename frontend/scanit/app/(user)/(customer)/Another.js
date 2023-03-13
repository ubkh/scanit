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
import { View, Text, ScrollView } from 'react-native';
import { Context } from '../../../context/GlobalContext';



const GroceryTrips = () => {
  const { previousPurchases, setPreviousPurchases } = useContext(Context);


  useEffect(() => {
    
  }, [previousPurchases]);


  return (
    <ScrollView>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Previous Grocery Trips:</Text>
      {previousPurchases.map((trip, index) => (
        <View key={index} style={{ paddingVertical: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{trip.tripName}</Text>
          <Text>Date: {trip.date}</Text>
          <Text>Location: {trip.location}</Text>
          <Text>Items:</Text>
          <View style={{ marginLeft: 20 }}>
            {trip.items.map((item, index) => (
              <Text key={index}>{item.data}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default GroceryTrips