import React, { useEffect, useState, useRef, createContext } from "react";
import { DJANGO, PROTOCOL } from "@env";
import * as SecureStore from "expo-secure-store";

export const Context = createContext();

// const setToken = async(token) => {
//     await SecureStore.setItemAsync('token', token);
// }

export default function ContextProvider(props) {
  const [domain, setDomain] = useState(DJANGO);
  const [protocol, setProtocol] = useState(PROTOCOL);

  const [retailerBarcodeData, setRetailerBarcodeData] = useState("");
  const [retailerBarcodeType, setRetailerBarcodeType] = useState("");
  const [basketList, setBasketList] = useState([]);
  const [isRetailerScanned, setRetailerScanned] = useState(false);
  const[previousPurchases, setPreviousPurchases] = useState([]);

  //const [ userType, setUserType ] = useState('retailer'); //'customer' or 'retailer'
  const [userID, setUserID] = useState(undefined); // ?

  useEffect(() => {}, []);

  const globalContext = {
    domain,
    protocol,
    basketList,
    setBasketList,
    isRetailerScanned,
    setRetailerScanned,
    retailerBarcodeData,
    setRetailerBarcodeData,
    retailerBarcodeType,
    setRetailerBarcodeType,
    previousPurchases,
    setPreviousPurchases,
    userID,
    setUserID,
  };

  return (
    <Context.Provider value={globalContext}>{props.children}</Context.Provider>
  );
}
