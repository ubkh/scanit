import React from 'react';
import { Button } from 'native-base';
import { ScrollView, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useContext , useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import { Context } from '../context/GlobalContext.js';
import { useAuth } from '../context/AuthContext';


const UploadItemButton = ({validProducts}) => {
  
    const router = useRouter();
    const globalContext = useContext(Context);
    const { domain } = globalContext;
    const { user } = useAuth();
    const { control, handleSubmit } = useForm();
    // const[error, setError] = useState('');
    const [ valid, setValid ] = useState(true);

    const onUploadProducts = async () =>{

        validProducts.forEach(product => {

            uploadProduct(product);

        })

        if (!valid) {
            alert('Some items are invalid and have not been uploaded! Redirecting to products page.');
        }

        router.push({pathname: '(retailer)/products/'})
        
    }

    const uploadProduct = async product => {
    
        console.log(user);

        product.store = user.user.employed_at_id;
        // product.user_id = user.user.user_id;
        let bodyData = JSON.stringify(product);

        fetch(`http://${domain}/api/retailer/add-product/`,{
            
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:bodyData,
            credentials: "include",
        })
        .then(res => {
            if (res.ok) {
                console.log(res)
                return res.json()
            } else {
                console.log(res);
                setValid(false);
                setError('error in uploading items')
                throw res.json()
            }
        })
        .catch(error => {
            console.log(error)
        })


    }


    return (
        <div>
            <Button onPress={handleSubmit(onUploadProducts)}>
                Upload Items!
            </Button>

        </div>
    );

};

export default UploadItemButton;
