import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import Staff from '../../../components/Staff.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';

const manageStaff = () => {

    const router = useRouter();
    const globalContext = useContext(Context);
    const { domain } = globalContext;
    const { user } = useAuth();
    const [ staff, setStaff ] = useState([]);

    const getStaff = async () => {

        const data = { 'user_id' : user.user.user_id };
        const body = JSON.stringify(data);
        console.log(body);

        fetch(`http://${domain}/api/retailer/get-staff/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: body,
            credentials: "include",
        })
        .then(res => {
            if (res.ok) {
                console.log(res)
                return res.json()
            } else {
                console.log(res);
                throw res.json()
            }
        })
        .then(json => {
            console.log(json)
            setStaff(json)
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    
    
    return (
        <div>
            
            <View style={styles.container}>

                <View style={styles.column}>
                    <Text style={styles.label}>Email:</Text>
                </View>

                <View style={styles.column}>
                    <Text style={styles.label}>First Name:</Text>
                </View>
                
                <View style={styles.column}>
                    <Text style={styles.label}>Last Name:</Text>
                </View>

            </View>

            {console.log(getStaff())}

            {staff.map((s,index) => (
                <div>
                    <Staff
                        key={index}
                        email={s.email}
                        first_name={s.first_name}
                        last_name={s.last_name}
                    />
                </div>
            ))}


        </div>
    )

}

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


export default manageStaff
