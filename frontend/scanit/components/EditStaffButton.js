import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import { useRouter } from "expo-router";

// const EditStaffButton = (user_id, first_name, last_name, email, password) => {
const EditStaffButton = ({data}) => {

    const router = useRouter();

    const onEditClicked = () => {
        
        router.push({ pathname: '/editStaff', params: { user_data: JSON.stringify(data) } });

    }

    return (
        <div>
            <Button onPress={onEditClicked}>
                <Text>Edit</Text>
            </Button>
        </div>
    )

}

export default EditStaffButton;
