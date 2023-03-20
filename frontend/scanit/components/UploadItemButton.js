import React from 'react';
import { Button } from 'native-base';
import { useContext , useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import { Context } from '../context/GlobalContext.js';

const UploadItemButton = ({validProducts}) => {
  
    const router = useRouter();
    const globalContext = useContext(Context);
    const { domain } = globalContext;
    const { control, handleSubmit } = useForm();
    // const[error, setError] = useState('');

    const onUploadProducts = async () =>{

        validProducts.forEach(product => {

            uploadProduct(product);

        })
        
    }

    const uploadProduct = async product => {
    
        let bodyData = JSON.stringify(product);
        console.log(bodyData);


        fetch(`http://${domain}/api/retailer/add-item/`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body:bodyData,
        })
        .then(res => {
            if (res.ok) {
                console.log(res)
                return res.json()
            } else {
                console.log(res);
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
