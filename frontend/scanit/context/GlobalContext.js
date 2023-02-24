import React, { useEffect, useState, useRef, createContext } from 'react';
import { DJANGO } from '@env'

export const Context = createContext();

export default function ContextProvider(props) {
    const [ domain, setDomain ] = useState(DJANGO);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [retailerBarcodeData, setRetailerBarcodeData] = useState("");
    const[retailerBarcodeType, setRetailerBarcodeType] = useState("");
    const[basketList, setBasketList] = useState([]);
    const[isRetailerScanned, setRetailerScanned] = useState(false);
    const [ userType, setUserType ] = useState('customer'); //'customer' or 'retailer'

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
    }

    return (
        <Context.Provider value={ globalContext }>
            {props.children}
        </Context.Provider>
    );
}

