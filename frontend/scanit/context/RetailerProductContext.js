import { useState, createContext } from "react";

/* 
A context for the retailer that allows the product form to be filled
using an existing prefetched product's data.
'productData' can be incomplete, containing only the barcode.
*/
export const ProductDataContext = createContext();

function ProductDataProvider({ children }) {
  const [productData, setProductData] = useState({});
  return (
    <ProductDataContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductDataContext.Provider>
  );
}

export default ProductDataProvider;
