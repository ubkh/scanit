import React from 'react';
import { Button } from 'native-base';
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

    const onUploadProducts = async () =>{

        validProducts.forEach(product => {

            uploadProduct(product);

        })
        
    }

    const uploadProduct = async product => {
    
        console.log(user);

        product.store = user.user.employed_at_id;
        let bodyData = JSON.stringify(product);
        console.log(bodyData);


        fetch(`http://${domain}/api/retailer/load-product/`,{
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
