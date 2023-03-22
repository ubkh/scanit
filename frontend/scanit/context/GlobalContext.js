import React, { useEffect, useState, useRef, createContext } from "react";
import { DJANGO } from "@env";
import * as SecureStore from "expo-secure-store";

export const Context = createContext();

// const setToken = async(token) => {
//     await SecureStore.setItemAsync('token', token);
// }

export default function ContextProvider(props) {
  const [domain, setDomain] = useState(DJANGO);

  const [retailerBarcodeData, setRetailerBarcodeData] = useState("");
  const [retailerBarcodeType, setRetailerBarcodeType] = useState("");
  const [basketList, setBasketList] = useState([]);
  const [isRetailerScanned, setRetailerScanned] = useState(false);
  const[previousPurchases, setPreviousPurchases] = useState([]);
  const[quantityValue, setQuantityValue] = useState(1);

  //const [ userType, setUserType ] = useState('retailer'); //'customer' or 'retailer'
  const [userID, setUserID] = useState(undefined); // ?

  useEffect(() => {}, []);

  const globalContext = {
    domain,
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
    quantityValue,
    setQuantityValue,
  };

  return (
    <Context.Provider value={globalContext}>{props.children}</Context.Provider>
  );
}
