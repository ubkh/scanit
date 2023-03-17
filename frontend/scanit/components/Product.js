import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// const Product = ({ retailerID, barcodeID, name, description, price, quantity, expiry }) => {
    const Product = ({ barcodeID, name, description, price, quantity, expiry }) => {
        return (
          <View style={styles.container}>

            <View style={styles.column}>
              <Text style={styles.label}>BarcodeID:</Text>
              <Text style={styles.value}>{barcodeID}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{name}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{description}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.value}>{price}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{quantity}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Expiry:</Text>
              <Text style={styles.value}>{expiry}</Text>
            </View>
            
          </View>
        );
      };
      
      const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        column: {
          
          marginHorizontal: 5,
          paddingHorizontal: 5,
          justifyContent: 'space-between',
        },
        label: {
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 5,
          
          marginHorizontal: 5,
          paddingHorizontal: 5,
          justifyContent: 'space-between',

        },
        value: {
          textAlign: 'center',
        },
      });

export default Product;