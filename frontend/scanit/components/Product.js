import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// const Product = ({ retailerID, barcodeID, name, description, price, quantity, expiry }) => {
const Product = ({ name, description, price, quantity, expiry }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{description}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{price}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{quantity}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Expiry:</Text>
                <Text style={styles.value}>{expiry}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    },
    label: {
    fontWeight: 'bold',
    },
    value: {
    flex: 1,
    textAlign: 'right',
    },
});

export default Product;