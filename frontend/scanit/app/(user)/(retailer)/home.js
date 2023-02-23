import { View, Text, Button, Box, Heading, StatusBar } from 'native-base';
import { useAuth } from '../../../context/AuthContext';
import { Link, useRouter, useSearchParams } from "expo-router";
import { useState, useContext } from 'react';
import { Context } from '../../../context/GlobalContext';
import ContainerStyle from '../../../styles/ContainerStyle';

function Retailer() {
    return (
        <View style={ContainerStyle.container}>
            <Heading size="lg" fontSize={30} bold justifyContent="left">Home</Heading>
            <Text style={{ fontFamily: 'Rubik-Bold' }}>You are in the retailer home!</Text>
            <LogOutButton />
        </View>
    );
}

function LogOutButton() {
    const { signOut } = useAuth();
    const router = useRouter();
    
    return (
       <Button
        bg="red.500"
        onPress={ (ev) => {
            signOut();
            router.push("/sign-in");
        }}>
            Log Out
        </Button>
    );
  }

export default Retailer;