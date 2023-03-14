


// import React, { useState } from 'react';
// import Product from './Product';

// const ItemLoader = () => {
//   const [selectedFile, setSelectedFile] = useState(undefined);

//   const handleFileSelection = (event) => {
//     const file = event.target.files[0];
  
//     if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'text/csv')) {
//       setSelectedFile(file);

//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const contents = e.target.result;
//         console.log(contents);
//       };


//       // console.log(file);
//     } else {
//       event.target.value = null; // reset the input element
//       setSelectedFile(undefined);
//       alert('Please select a valid file');
//     }
//   };

//   // const handleFileDrop = (event) => {
//   //   // event.preventDefault();
//   //   const file = event.dataTransfer.items[0].getAsFile();

//   //   if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'text/csv')) {
//   //     setSelectedFile(file);
//   //   } else {
//   //     alert('Please drop a valid file');
//   //   }
//   // };

//   return (
//     <div>
//       <input
//         type="file"
//         //onDragOver={(event) => event.preventDefault()}
//         //onDrop={handleFileDrop}   
//         onChange={handleFileSelection}
//         accept=".xlsx, .csv"
//       />
//     </div>
//   );
// };



// export default ItemLoader;

import csv from 'csv-parser';
import { useEffect, useState } from 'react';
import Product from './Product';

const ItemLoader = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [productData, setProductData] = useState([]);

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
  
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'text/csv')) {
      setSelectedFile(file);

      console.log(file);
    } else {
      event.target.value = null; // reset the input element
      setSelectedFile(undefined);
      alert('Please select a valid file');
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function(event) {
        const csvData = event.target.result;

        // Use csv-parser to convert CSV data to JSON object
        csv({ headers: ['name', 'description', 'price', 'quantity', 'expiry'] })
          .fromString(csvData)
          .then((parsedData) => {
            setProductData(parsedData);
          });
      };

      reader.readAsText(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div>
      <input
        type="file"
        onChange={handleFileSelection}
        accept=".xlsx, .csv"
      />

      {productData.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
          expiry={product.expiry}
        />
      ))}
    </div>
  );
};

export default ItemLoader;