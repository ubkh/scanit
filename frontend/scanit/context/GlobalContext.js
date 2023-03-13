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
    const[previousPurchases, setPreviousPurchases] = useState([]);
    //     {
    //       tripName: 'Trip 1',
    //       date: '2022-03-01',
    //       location: 'London',
    //       items: ['Milk', 'Bread', 'Eggs']
    //     },
    //     {
    //       tripName: 'Trip 2',
    //       date: '2022-02-15',
    //       location: 'Paris',
    //       items: ['Butter', 'Cheese', 'Yogurt']
    //     },
    //     {
    //       tripName: 'Trip 3',
    //       date: '2022-01-27',
    //       location: 'New York',
    //       items: ['Apples', 'Oranges', 'Bananas']
    //     },
    //   ]);

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
    }

    return (
        <Context.Provider value={ globalContext }>
            {props.children}
        </Context.Provider>
    );
}

