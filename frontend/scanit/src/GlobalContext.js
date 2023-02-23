import React, { useEffect, useState, useRef, createContext } from 'react';
import { DJANGO } from '@env';
import * as SecureStore from 'expo-secure-store';

export const Context = createContext();

const setToken = async(token) => {
    await SecureStore.setItemAsync('token', token);
}

export default function ContextProvider(props) {
    const [ domain, setDomain ] = useState(DJANGO);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ userID, setUserID ] = useState()
    const [ token, setToken ] = useState()
    const [barcodeData, setBarcodeData] = useState("empty")
    const[barcodeType, setBarcodeType] = useState("empty")

    useEffect(() => {
    }, []);

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userID,
        setUserID,
        setToken,
    }

    return (
        <Context.Provider value={ globalContext }>
            {props.children}
        </Context.Provider>
    );
}

