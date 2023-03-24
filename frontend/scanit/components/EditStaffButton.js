import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';

// const EditStaffButton = (user_id, first_name, last_name, email, password) => {
const EditStaffButton = ({first_name}) => {

    return (
        <div>
            <Button>
                <Text>Edit user: {first_name}</Text>
            </Button>
        </div>
    )

}

export default EditStaffButton;
