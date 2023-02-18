import React, { useEffect, useState, useRef, createContext } from 'react';
import { DJANGO } from '@env'

export const Context = createContext();

export default function ContextProvider(props) {
    const [ domain, setDomain ] = useState(DJANGO);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
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
        setToken
    }

    return (
        <Context.Provider value={ globalContext }>
            {props.children}
        </Context.Provider>
    );
}

