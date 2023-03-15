import React from 'react';
import { Button } from 'native-base';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import { Context } from '../context/GlobalContext.js';

const UploadItemButton = ({validProducts}) => {
  
    const router = useRouter();
    const globalContext = useContext(Context);
    const { domain } = globalContext;
    const { control, handleSubmit } = useForm();

    const onUploadProducts = async data => {
    
        let body = JSON.stringify(data);

        fetch(`http://${domain}/api/retailer/uploadItems/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:body
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                setError('error in uploading items')
                throw res.json()
            }
        })
        .then(json => {
            router.push({pathname: '/signUp/verify'})
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
