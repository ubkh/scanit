import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { View, Text,Container, Heading, Button, StatusBar, Center, Flex, Divider, Spacer, useColorMode } from 'native-base';
import { Context } from '../../../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';




const GroceryTrips = () => {
  const { colorMode } = useColorMode();
  const { previousPurchases, setPreviousPurchases } = useContext(Context);
  const { basketList, setBasketList } = useContext(Context);
  const [purchasesDisplayed, setPurchasesDisplayed] = useState(<Text> You have no previous purchases </Text>)
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


  const addDays = (date, days) => {
    var result = new Date(date.substring(6,10),date.substring(3,5),date.substring(0,2));
    result.setMonth(result.getMonth() - 1);
    result.setTime(result.getTime() + (days * 24 * 60 * 60 * 1000));

    return result;
  }

  const removeItem = (index, date) => {
    Alert.alert(
          'Return Item',
          'Are you sure you want to return this item?',
          [
            {
              text: 'Ok',
              onPress: () => {
                var maxReturnDate = addDays(date, 30);
                var today = new Date();
                //today.setTime(today.getTime() + (30 * 24 * 60 * 60 * 1000));
                //console.warn(today)
                //console.warn(maxReturnDate);

                if (today <= maxReturnDate){
                  console.warn("you can return this item")
                } else {
                  console.warn("it has gone past the expiry date")
                }
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

    if(previousPurchases.length == 0){
      setPurchasesDisplayed(<Text> You have no previous purchases</Text>);
    }else {
      setPurchasesDisplayed(
      <View style={styles.basketList}>
        <ScrollView>
        <Text style={styles.basketHeader}>{previousPurchases.length} Previous Grocery Trips:</Text>
        {previousPurchases.map((trip, index) => (
          <View style={styles.basketEntry} key ={index}>
            <Text><B>Date:</B> {trip.date}</Text>
            <Text><B>Time:</B> {trip.time}</Text>
            <Text><B>Location:</B> {trip.location}</Text>
            <Text><B>Items:</B></Text>
            <View style={{ marginLeft: 20 }}>
              {trip.items.map((item, index) => (
                <>
                  <Text key={index}>Name: {item.name + "\n"}Barcode: {item.barcode + "\n"}Price: {"£" + (item.price / 100) + "\n"}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }} key={index}>
                      <TouchableOpacity style={styles.button} onPress={() => removeItem(index,trip.date)}>
                        <Ionicons name="arrow-undo-outline" color="white" />
                      </TouchableOpacity>
                    </View>
                </>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>

      )
    }
    }
    
  , [previousPurchases, colorMode]);

  return (
    <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
    <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
    <Flex flex={1} alignItems="center" safeAreaTop>
        <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Purchases</Heading>
        <Divider my="2" _light={{
            bg: "muted.200"
        }} _dark={{
            bg: "muted.500"
        }} />

        <Spacer />
        {purchasesDisplayed}
        <Spacer />
    </Flex>
    </View> 
  );

  // return (
  //   <ScrollView>
  //     <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Previous Grocery Trips:</Text>
  //     {previousPurchases.map((trip, index) => (
  //       <View key={index} style={{ paddingVertical: 5 }}>
  //         <Text>Date: {trip.date}</Text>
  //         <Text>Time: {trip.time}</Text>
  //         <Text>Location: {trip.location}</Text>
  //         <Text>Items:</Text>
  //         <View style={{ marginLeft: 20 }}>
  //           {trip.items.map((item, index) => (
  //             <><Text key={index}>{item.data}</Text><View style={{ flexDirection: "row", justifyContent: "flex-end" }} key={index}>
  //               <TouchableOpacity
  //                 onPress={() => removeItem(index)}
  //               >
  //                 <View
  //                   style={{
  //                     backgroundColor: 'red',
  //                     borderRadius: 20,
  //                     padding: 10,
  //                   }}
  //                 >
  //                   <Ionicons
  //                     name="trash-outline"
  //                     size={25}
  //                     color="white" />
  //                 </View>
  //               </TouchableOpacity>
  //             </View></>
  //           ))}
 
  //         </View>
  //       </View>
  //     ))}
  //   </ScrollView>
  // );
}

const styles = StyleSheet.create({
  basketHeader: {
    marginTop: 10,
    padding: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  basketList: {
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      
  },
  basketEntry: {
      padding: 10,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%'
  },
  button: {
    backgroundColor: '#50C878',
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default GroceryTrips