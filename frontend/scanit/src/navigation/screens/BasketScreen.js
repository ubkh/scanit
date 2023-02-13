import { View, ScrollView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/base';
import { Context } from '../../GlobalContext';
import ContainerStyle from '../../styles/ContainerStyle';

function BasketScreen(props) {
    const { basketList } = useContext(Context);
    const [basketItems, setBasketItems] = useState(<Text> Your basket is empty </Text>);
  
    useEffect(() => {
        if (basketList.length === 0) {
          setBasketItems(<Text> Your basket is empty </Text>);
        } else {
          setBasketItems(
        <View style={styles.basketList}>
          <Text style={styles.basketHeader}>{basketList.length} items</Text>
          <View style={{width: '100%'}}><Button onPress= {() => console.log("Checkout button")}>Checkout!</Button></View>
          <ScrollView>
            {basketList.map(item => (
              <View style={styles.basketEntry}>
                  <TouchableOpacity key={item.data}>
                      <Text>Barcode ID: {item.data}</Text>
                      <Text>Barcode Type: {item.type}</Text>
                  </TouchableOpacity>
                  <Text>&nbsp;</Text>
              </View>
            ))}
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
        justifyContent: 'center',
        width: '100%',
        
    },
    basketEntry: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        padding: 10,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    }
});

export default BasketScreen;
