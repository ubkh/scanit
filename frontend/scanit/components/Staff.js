import { React, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import EditStaffButton from './EditStaffButton';

const Staff = ({ email, first_name, last_name, data }) => {
    
    // const { userData, setUserData } = useState(data);

    return (
        <View style={styles.container}>

            <View style={styles.column}>
                <Text style={styles.value}>{email}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.value}>{first_name}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.value}>{last_name}</Text>
            </View>
        
            <View style={styles.column}>
                <EditStaffButton
                    data={data}
                />
                {/* <Button>
                    <Text>Button for {first_name} {last_name}</Text>
                </Button> */}
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

export default Staff;