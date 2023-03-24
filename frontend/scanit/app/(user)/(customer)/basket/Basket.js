import { ScrollView, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { View, Container, Text, Heading, Button, StatusBar, Center, Flex, Divider, Spacer, useColorMode } from 'native-base';
import { useState, useContext, useEffect } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
import { Context } from '../../../../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import NumericInput from 'react-native-numeric-input'; // https://github.com/himelbrand/react-native-numeric-input for props and info



function Basket(props) {
    const globalContext = useContext(Context);
    const { colorMode } = useColorMode();
    const { basketList, setBasketList } = useContext(Context);
    const { total, setTotal } = useContext(Context);
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
                  console.log(`Removing item at index ${index} of the basket.`)
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

    // calculate the total to display at checkout
    const calculateTotalString = () => {
      let sum = 0;
      for (let i = 0; i < basketList.length; i++) {
        sum += basketList[i].price * basketList[i].quantity
      }

      setTotal(sum);

      return "£" + (sum / 100)
    }
    
    useEffect(() => {
        setBasketList(basketList);

        if (basketList.length === 0) {
          setBasketItems(<Text> Your basket is empty </Text>);
        } else {
          setBasketItems(
        <View style={styles.basketList}>
          <ScrollView>
          <Text style={styles.basketHeader}>{basketList.length} products</Text>
            {basketList.map((item, index) => (
              <View style={styles.basketEntry} key={index}>
                  <View key={index}>
                      <Text>Name: {item.name}</Text>
                      <Text>Barcode ID: {item.barcode}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>Price: {"£" + (item.price / 100)}</Text>
                      <Text>&nbsp;</Text>
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
                        rightButtonBackgroundColor={colorMode === 'light' ? 'white' : '#313332'}
                        leftButtonBackgroundColor={colorMode === 'light' ? 'white' : '#313332'}
                        iconStyle={colorMode === 'light' ? { fontSize: 18, color: 'black' } : {fontSize: 18, color: 'white'}}
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
                  </View>
                  <Text>&nbsp;</Text>
              </View>
            ))}
            <View style={{width: '90%', alignSelf: "center"}}>
                <Button shadow={2} bg="brand.400" style={{ marginBottom: 100 }}onPress= {() => router.push("basket/payment")}>
                  <Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>Checkout! • {calculateTotalString()}</Text>
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
});

export default Basket;