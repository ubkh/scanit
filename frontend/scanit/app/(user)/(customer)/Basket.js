import { View, ScrollView, Platform, TouchableOpacity, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { useState, useContext, useEffect } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import { Context } from '../../../context/GlobalContext';
import ContainerStyle from '../../../styles/ContainerStyle';
import { Ionicons } from '@expo/vector-icons';

function Basket(props) {
    const { basketList, setBasketList } = useContext(Context);
    const [basketItems, setBasketItems] = useState(<Text> Your basket is empty </Text>);

    const removeItem = (index) => {
      Alert.alert(
            'Remove Item',
            'Are you sure you want to delete this item?',
            [
              {
                text: 'Ok',
                onPress: () => {
                  console.log(`Removing item at index ${index} of the basket. Bros too poor lmao`)
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
        if (basketList.length === 0) {
          setBasketItems(<Text> Your basket is empty </Text>);
        } else {
          setBasketItems(
        <View style={styles.basketList}>
          <ScrollView>
          <Text style={styles.basketHeader}>{basketList.length} items</Text>
            {basketList.map((item, index) => (
              <View style={styles.basketEntry} key={index}>
                  <TouchableOpacity key={index}>
                      <Text>Barcode ID: {item.data}</Text>
                      <Text>Barcode Type: {item.type}</Text>
                      <View style={{flexDirection: "row", justifyContent: "flex-end"}} key={index}>
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
                              color="white"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                  </TouchableOpacity>
                  <Text>&nbsp;</Text>
              </View>
            ))}
            <View style={{width: '90%', alignSelf: "center"}}>
                <Button shadow={2} bg="brand.400" style={{ marginBottom: 10 }}onPress= {() => console.log("Checkout button")}>
                  <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>Checkout!</Text>
                </Button>
              </View>
          </ScrollView>
        </View>
        );
        }
      }, [basketList]);
      
  
    return (
      <View style={ContainerStyle.container}>
        {basketItems}
      </View>
      
    );
  }

  // CSS
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
        // position: 'absolute',
        // top: 0,
        // left: 0,
        padding: 10,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    }
});

// VERSION OF BARCODE SCAN THAT DOESN'T ALLOW DUPLICATES IN BASKET

// const handleBarCodeScanned = ({ type, data }) => {
//   setScanned(true);
//   setText(data)
//   console.log('Type: ' + type + '\nData: ' + data)
//   const check  = basketList.find(obj => obj.data === data)
//   if (check) {
//     Alert.alert(
//     'Item Already in Basket',
//     'This item is already in your basket!',
//     [
//       {
//         text: 'Ok',
//         onPress: () => {
//           console.log("Ok on dialog was pressed")
//           navigation.navigate('HomeScreen', { data, type });
//         },
//         style: 'default',
//       },
//     ],)
//   }
//   else {
//     globalContext.setBasketList([...globalContext.basketList, { 'data': data, 'type': type }])
//     navigation.navigate('HomeScreen', { data, type });
//   }
// };

export default Basket;