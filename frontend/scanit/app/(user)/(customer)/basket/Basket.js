// import { ScrollView, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { View, Container, Text, Heading, Button, StatusBar, Center, Flex, Divider, Spacer, useColorMode } from 'native-base';
// import { useState, useContext, useEffect } from 'react';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// import { Context } from '../../../../context/GlobalContext';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from "expo-router";
// import NumericInput from 'react-native-numeric-input'; // https://github.com/himelbrand/react-native-numeric-input for props and info



// function Basket(props) {
//     const { colorMode } = useColorMode();
//     const { basketList, setBasketList } = useContext(Context);
//     const [basketItems, setBasketItems] = useState(<Text> Your basket is empty </Text>);
//     const router = useRouter();


//     const removeItem = (index) => {
//       Alert.alert(
//             'Remove Item',
//             'Are you sure you want to delete this item?',
//             [
//               {
//                 text: 'Ok',
//                 onPress: () => {
//                   console.log(`Removing item at index ${index} of the basket. Bros too poor lmao`)
//                   const newList = [...basketList];
//                   newList.splice(index, 1);
//                   setBasketList(newList);
//                 },
//                 style: 'default',
//               },
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//             ],)
//     }

//     const handleQuantityChange = (index, newQuantity) => {
//       const updatedBasketList = basketList.map((basketItem, i) => {
//         if (i === index) {
//           return { ...basketItem, quantity: newQuantity };
//         } else {
//           return basketItem;
//         }
//       });
//       setBasketList(updatedBasketList);
//     };
    
//     useEffect(() => {
//         setBasketList(basketList);

//         if (basketList.length === 0) {
//           setBasketItems(<Text> Your basket is empty </Text>);
//         } else {
//           setBasketItems(
//         <View style={styles.basketList}>
//           <ScrollView>
//           <Text style={styles.basketHeader}>{basketList.length} products</Text>
//             {basketList.map((item, index) => (
//               <View style={styles.basketEntry} key={index}>
//                   <View key={index}>
//                       <Text>Barcode ID: {item.data}</Text>
//                       <Text>Barcode Type: {item.type}</Text>
//                       <Text>Quantity: {item.quantity}</Text>

//                     <View testID={`numeric-input-${index}`}>
//                       <NumericInput
//                         key={`${item.data}`}
//                         value={item.quantity}
//                         onChange={value => {
//                           if (value > 0) {
//                             handleQuantityChange(index, value);
//                           }
//                           else {
//                             Alert.alert(
//                               'Enter a valid quantity',
//                               'Quantity must be 1 or more!',
//                               [
//                                 {
//                                   text: 'Ok',
//                                   style: 'default',
//                                 },
//                               ],
//                             )
//                           }
//                         }} 
//                         minValue={1}
//                         rounded={true}
//                         textColor={colorMode === 'light' ? 'black' : 'white'}
//                         totalHeight={40}
//                         totalWidth={100}
//                       />
//                     </View>


//                       <View style={{flexDirection: "row", justifyContent: "flex-end"}} key={index}>
//                         <TouchableOpacity
//                           testID={`remove-button-${index}`}
//                           onPress={() => removeItem(index)}
//                         >
//                           <View
//                             style={{
//                               backgroundColor: 'red',
//                               borderRadius: 20,
//                               padding: 10,
//                             }}
//                           >
//                             <Ionicons
//                               name="trash-outline"
//                               size={25}
//                               color="white"
//                             />
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                   </View>
//                   <Text>&nbsp;</Text>
//               </View>
//             ))}
//             <View style={{width: '90%', alignSelf: "center"}}>
//                 <Button shadow={2} bg="brand.400" style={{ marginBottom: 100 }}onPress= {() => router.push("basket/payment")}>
//                   <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>Checkout!</Text>
//                 </Button>
//               </View>
//           </ScrollView>
//         </View>
//         );
//         }
//       }, [basketList, colorMode]);
      
  
//     return (
//       <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
//       <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
//       <Flex flex={1} alignItems="center" safeAreaTop>
//           <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Basket</Heading>
//           <Divider my="2" _light={{
//               bg: "muted.200"
//           }} _dark={{
//               bg: "muted.500"
//           }} />

//           <Spacer />
//           {basketItems}
//           <Spacer />
//       </Flex>
//       </View>      
//     );
//   }

//   // CSS
//   const styles = StyleSheet.create({
//     basketHeader: {
//       marginTop: 10,
//       padding: 10,
//       fontStyle: "italic",
//       fontWeight: "bold",
//       fontSize: 20,
//     },
//     basketList: {
//         alignSelf: 'flex-start',
//         justifyContent: 'flex-start',
//         width: '100%',
        
//     },
//     basketEntry: {
//         // position: 'absolute',
//         // top: 0,
//         // left: 0,
//         padding: 10,
//         alignSelf: 'flex-start',
//         justifyContent: 'flex-start',
//         width: '100%'
//     },
//     checkoutButtonContainer: {
//       position: "absolute",
//       bottom: 10,
//       left: 0,
//       right: 0,
//       alignItems: "center",
//       justifyContent: "center",
//     },
// });

// export default Basket;

import { ScrollView, Platform, TouchableOpacity, StyleSheet, Alert, Animated} from 'react-native';
import { View, Container, Text, Heading, Button, StatusBar, Center, Flex, Divider, Spacer, useColorMode } from 'native-base';
import { useState, useContext, useEffect, useRef } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
import { Context } from '../../../../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import NumericInput from 'react-native-numeric-input'; // https://github.com/himelbrand/react-native-numeric-input for props and info

const Pulse = (props) => {
  const [scaleValue] = useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 700,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        delay: 1200,
      }).start();
    });
  }, []);

  return (
    <View style={styles.pulseContainer}>
      <Animated.View
        style={[
          styles.pulse,
          { transform: [{ scale: scaleValue }] },
        ]}
      />
      <View style={styles.item}>
        {props.children}
      </View>
    </View>
  );
};

function Basket(props) {
    const { colorMode } = useColorMode();
    const { basketList, setBasketList } = useContext(Context);
    const [basketItems, setBasketItems] = useState(<Text> Your basket is empty </Text>);
    const router = useRouter();


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
                style: 'cancel',
              },
            ],)
    }

    const handleQuantityChange = (index, newQuantity) => {
      const updatedBasketList = basketList.map((basketItem, i) => {
        if (i === index) {
          return { ...basketItem, quantity: newQuantity };
        } else {
          return basketItem;
        }
      });
      setBasketList(updatedBasketList);
    };
    
    useEffect(() => {
        setBasketList(basketList);

        if (basketList.length === 0) {
          setBasketItems(<Text> Your basket is empty </Text>);
        } else {
          setBasketItems(
        <View style={styles.basketList}>
          <ScrollView
         ref={ref => {this.scrollView = ref}}
         onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          <Text style={styles.basketHeader}>{basketList.length} products</Text>
            {basketList.map((item, index) => (
              <View style={styles.basketEntry} key={index}>
                  <Pulse key={index}>
                      <Text>Barcode ID: {item.data}</Text>
                      <Text>Barcode Type: {item.type}</Text>
                      <Text>Quantity: {item.quantity}</Text>

                    <View testID={`numeric-input-${index}`}>
                      <NumericInput
                        key={`${item.data}`}
                        value={item.quantity}
                        onChange={value => {
                          if (value > 0) {
                            handleQuantityChange(index, value);
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


                      <View style={{flexDirection: "row", justifyContent: "flex-end"}} key={index}>
                        <TouchableOpacity
                          testID={`remove-button-${index}`}
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
                  </Pulse>
                  <Text>&nbsp;</Text>
              </View>
            ))}
            <View style={{width: '90%', alignSelf: "center"}}>
                <Button shadow={2} bg="brand.400" style={{ marginBottom: 100 }}onPress= {() => router.push("basket/payment")}>
                  <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>Checkout!</Text>
                </Button>
              </View>
          </ScrollView>
        </View>
        );
        }
      }, [basketList, colorMode]);
      
  
    return (
      <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
      <Flex flex={1} alignItems="center" safeAreaTop>
          <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Basket</Heading>
          <Divider my="2" _light={{
              bg: "muted.200"
          }} _dark={{
              bg: "muted.500"
          }} />

          <Spacer />
          {basketItems}
          <Spacer />
      </Flex>
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
        padding: 10,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    },
    checkoutButtonContainer: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    pulseContainer: {
      marginVertical: 10,
      borderWidth: 1,
      //borderColor: '#f8d70b',
      borderColor:'#50C878',
      borderRadius: 5,
      padding: 10,
    },
    pulse: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(125, 225, 10, 0.3)',
      borderRadius: 5,
    },
});

export default Basket;