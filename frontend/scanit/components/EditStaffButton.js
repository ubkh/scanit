import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import { useRouter } from "expo-router";

// const EditStaffButton = (user_id, first_name, last_name, email, password) => {
const EditStaffButton = ({first_name, data}) => {

    const router = useRouter();

    const onEditClicked = () => {
        
        // console.log("data here is")
        // console.log(data)
        router.push({ pathname: '/editStaff', params: { user_data: JSON.stringify(data) } });
        // router.push({pathname: '/signUp/verify', params: {user_id: json.user_id}});
        // console.log("inside here we have")
        // console.log(data)

    }

    return (
        <div>
            <Button onPress={onEditClicked}>
                <Text>Edit user: {first_name}</Text>
            </Button>
        </div>
    )

}

export default EditStaffButton;
