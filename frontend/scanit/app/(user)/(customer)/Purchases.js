import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, } from 'react-native';
import { View, Text, Heading, StatusBar, Flex, Divider, Spacer, useColorMode } from 'native-base';
import { Context } from '../../../context/GlobalContext';
import { useAuth } from '../../../context/AuthContext';

/*A page for the customer to see their Previous Transactions
includes GET Requests to the backend to get Transactions and Store*/ 

  
export default function Purchases() {
    const globalContext = useContext(Context)
    const { colorMode } = useColorMode();
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


    const { user } = useAuth();
    const[userPurchases, setUserPurchases] = useState([])
    const[purchasesDisplayed, setPurchasesDisplayed] = useState(<Text> You have no previous purchases </Text>)


    /*Function to fetch the user transactions,filtering it by the user's ID */
      const fetchUserTransactions = async () => {
        try {
          // AWAIT THE RESPONSE SO WE DON'T CONTINUE WITHOUT THIS
          const response = await fetch(`http://${globalContext.domain}/api/transactions-by-user-id/?customer=${user.user.user_id}`,
          {
            method: "GET",
          });
    
          const transactions = await response.json();
          //console.log("--------------------")
          //console.log(transactions);
    
          setUserPurchases(transactions);
    
        } catch (error) {
          console.error(error); 
        }
      }
      /*Function to fetch the store details using the shop ID, with the aim of getting the name of the store */
      const fetchStore = async (shop_user_id) => {
        try {
          // AWAIT THE RESPONSE SO WE DON'T CONTINUE WITHOUT THIS
          const response = await fetch(`http://${globalContext.domain}/api/stores-by-shop-id/?id=${shop_user_id}`,
          {
            method: "GET",
          });
    
          const shoppingWith = await response.json();
          console.log("--------------------")
          
          return shoppingWith[0].name;
    
    
        } catch (error) {
          console.error(error);
        }
      }


    useEffect(() => {
      //fetchStore(1);
    }, []);

    useEffect(() => {
        fetchUserTransactions();//Continuously fetching transaction so page updates dynamically

        if(userPurchases.length == 0){
          setPurchasesDisplayed(<Text> You have no previous purchases</Text>);
        }
        else { //create a table of receipts for the user's transactions
          setPurchasesDisplayed(
          <View style={styles.purchasesList}>
            <ScrollView>
            <Text style={styles.header}>{userPurchases.length} Previous Grocery Trips:</Text>
            {userPurchases.map((trip, index) => (
              <View style={styles.purchasesEntry} key ={index}>
                <Text><B>Date:</B> {trip.date.substring(8,10) + '/' + trip.date.substring(5,7) + '/' + trip.date.substring(0,4)}</Text> 
                <Text><B>Total Amount:</B> {'£' + trip.amount/100}</Text>
                <Text><B>Transaction ID:</B> {trip.transaction_id}</Text>


                <Text><B>Items:</B></Text>
                <View style={{ marginLeft: 20 }}>
                  {JSON.parse(trip.products).map((item, index) => (
                    <>
                      <Text style={styles.textt} key={index}>Name: {item.name + "\n"}Barcode: {item.barcode + "\n"}Price: {"£" + (item.price / 100) + "\n"}Quanity: {item.quantity + "\n"}</Text>

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
        
      , [userPurchases, colorMode]);

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

    
  
}

//CSS
const styles = StyleSheet.create({
    header: {
      marginTop: 10,
      padding: 10,
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 20,
    },
    purchasesList: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        
    },
    purchasesEntry: {
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
    textt:{
      marginBottom: 30,
    }
  });
  