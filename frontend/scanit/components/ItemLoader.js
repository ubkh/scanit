import { View, Text, Button, Box, Heading, StatusBar, Center, Icon } from 'native-base';
import { useEffect, useState } from 'react';
import Product from './Product';
import * as XLSX from "xlsx";

const ItemLoader = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [productData, setProductData] = useState([]);
  const [jsonProductData, setJsonProductData] = useState();

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
        {jsonProductData.map(p => (
          <Product
            key={p.name}
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
      setJsonProductData(convertToJson(data))
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
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  return (
    <div>
      <input
        type="file"
        onChange={handleFileSelection}
        accept=".xlsx, .csv"
        />
      
      <Product
        name="a"
        description="jammie dodgers"
        price="12.50"
        quantity="25"
        expiry="12/11/23"
      />

      <Button>
        Upload!
      </Button>
    </div>
  );
};



export default ItemLoader;