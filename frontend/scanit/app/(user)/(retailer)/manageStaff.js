import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text, Box, StatusBar, useColorMode, Heading, Divider } from 'native-base';
import CustomInput from '../../../components/CustomInput.js';
import Staff from '../../../components/Staff.js';
import { useRouter, useSearchParams } from "expo-router";
import { Context } from '../../../context/GlobalContext.js';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';

const ManageStaff = () => {

    const router = useRouter();
    const globalContext = useContext(Context);
    const { domain } = globalContext;
    const { user } = useAuth();
    const [ staff, setStaff ] = useState([]);

    useEffect(() => {
        const getStaff = async () => {
            try {
                const res = await fetch(`http://${domain}/api/retailer/get-staff/${user.user.employed_at_id}/`, {
                    include: 'credentials',
                });
                if (res.ok) {
                    const json = await res.json();
                    setStaff(json.staff);
                } else {
                    console.log(res);
                    throw res.json();
                }
            } catch (error) {
                console.log(error);
            }
        };
        getStaff();
    }, []);

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

            {staff.map((s) => (
                <div>
                    <Staff
                        key={s.email}
                        email={s.email}
                        first_name={s.first_name}
                        last_name={s.last_name}
                        data={s}
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

export default ManageStaff