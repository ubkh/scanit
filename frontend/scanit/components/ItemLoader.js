import { View, Text, Button, Box, Heading, StatusBar, Center, Icon } from 'native-base';
import { useEffect, useState } from 'react';
import UploadItemButton, { UploadButton } from "./UploadItemButton.js";
import Product from './Product';
import * as XLSX from "xlsx";

const ItemLoader = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [jsonProductData, setJsonProductData] = useState([]);

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
  
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'text/csv')) {
      setSelectedFile(file);
      // console.log(file);

      readFile(file);


    } else {
      event.target.value = null; // reset the input element
      setSelectedFile(undefined);
      alert('Please select a valid file');
    }
  };

  function displayProducts() {
    return (
      <div>
        {jsonProductData.map((p,index) => (
          <Product
            key={index}
            name={p.name}
            description={p.description}
            price={p.price}
            quantity={p.quantity}
            expiry={p.expiry}
          />
        ))}
      </div>
    );
  }

  function validateProducts(productsList) {  // name , description, price, quantity, expirydate
  
    var validProducts;
    
    validProducts = productsList.filter((product) => {

      return isItemValid(product);

    });
    
    return validProducts;

  }
  
  function isItemValid(product) {
    try {
      if(product.barcodeID == undefined){
        return false;
      }
      if(product.barcodeID == ''){
        return false;
      }

      if (product.name == undefined) {
        return false;
      }
  
      if (product.name == '') {
        return false;
      }
  
      if (product.description == undefined) {
        return false;
      }
  
      if (product.description == '') {
        return false;
      }
  
      if (product.price == undefined) {
        return false;
      }

      if (isNaN(parseFloat(product.price))) {
        return false;
      }
      
      if (parseFloat(product.price) <= 0) {
        return false;
      }

      if (product.quantity == undefined) {
        return false;
      }
  
      if (isNaN(parseInt(product.quantity))) {
        return false;
      }

      if (parseInt(product.quantity) < 0) {
        return false;
      }

      if (product.expiry == undefined) {
        return false;
      }
  
      const current_date = new Date();
      const timestamp = Date.parse(product.expiry);
      const item_date = new Date(timestamp);

      if (item_date < current_date) {
        return false;
      }
  
      return true;

    }
    catch (e) {
      console.log(e);
      return false;
    
    }
  









  }

  function readFile(f) {
    
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data);// shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format
      convertToJson(data).map(x => x); // shows data in json format
      var validData = validateProducts(convertToJson(data));
      setJsonProductData(validData);
    };
    reader.readAsBinaryString(f);
  };

  
  function convertToJson(csv) {
    var lines = csv.split("\n");
    
    var result = [];
    
    var headers = lines[0].split(",");
    
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      
      result.push(obj);
    }
    
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
  }





  return (
    <div>
      <input
        type="file"
        onChange={handleFileSelection}
        accept=".xlsx, .csv"
        />
      
      {/* <Product
        name="a"
        description="jammie dodgers"
        price="12.50"
        quantity="25"
        expiry="12/11/23"
      /> */}
      <div>
        {jsonProductData.map((p,index) => (
          <Product
            key={index}
            barcodeID={p.barcodeID}
            name={p.name}
            description={p.description}
            price={p.price}
            quantity={p.quantity}
            expiry={p.expiry}
          />
          ))}
      </div>

      <UploadItemButton validProducts={jsonProductData}/>

    </div>
  );
};

export default ItemLoader;