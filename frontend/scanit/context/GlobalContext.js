import React, { useEffect, useState, useRef, createContext } from 'react';
import { DJANGO } from '@env'
import * as SecureStore from 'expo-secure-store';

export const Context = createContext();

const setToken = async(token) => {
    await SecureStore.setItemAsync('token', token);
}

export default function ContextProvider(props) {
    const [ domain, setDomain ] = useState(DJANGO);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [retailerBarcodeData, setRetailerBarcodeData] = useState("");
    const[retailerBarcodeType, setRetailerBarcodeType] = useState("");
    const[basketList, setBasketList] = useState([]);
    const[isRetailerScanned, setRetailerScanned] = useState(false);
    const [ userType, setUserType ] = useState('customer'); //'customer' or 'retailer'
    const[previousPurchases, setPreviousPurchases] = useState([]);
    const [ userID, setUserID ] = useState()
    const [ token, setToken ] = useState()

    useEffect(() => {
    }, []);

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        basketList,
        setBasketList,
        isRetailerScanned,
        setRetailerScanned,
        retailerBarcodeData,
        setRetailerBarcodeData,
        retailerBarcodeType,
        setRetailerBarcodeType,
        userType,
        previousPurchases,
        setPreviousPurchases,
        token,
        setToken,
        userID,
        setUserID,
    }

    return (
        <Context.Provider value={ globalContext }>
            {props.children}
        </Context.Provider>
    );
}

