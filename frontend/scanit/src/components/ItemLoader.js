// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
// import DocumentPicker, {DirectoryPickerResponse,DocumentPickerResponse,isInProgress,types} from 'react-native-document-picker';
// import * as Progress from 'react-native-progress';

// const ItemLoader = () => {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       setFile(result);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker
//       } else {
//         Alert.alert('Error', err.message);
//       }
//     }
//   };

//   const onDrop = async (event) => {
//     const result = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });

//     setFile(result);
//     console.log("Complete");
//     console.log(file);
//   };
//   const handleError = (err) => {
//     if (DocumentPicker.isCancel(err)) {
//       console.warn('cancelled')
//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else if (isInProgress(err)) {
//       console.warn('multiple pickers were opened, only the last will be considered')
//     } else {
//       throw err
//     }
//   }

//   return (
//     <View style={styles.container}>
//       {file ? (
//         <View style={styles.file}>
//           <Text>{file.name}</Text>
//           <Progress.Bar progress={progress} width={200} />
//         </View>
//       ) : (
//         <TouchableOpacity onPress={pickFile} onDrop={onDrop}>
//           <View style={styles.dropZone}>
//             <Text style={styles.text}>Drag and drop a file here</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       <Button
//         title="open picker for single selection of pdf file"
//         onPress={() => {
//           DocumentPicker.pick({
//             type: types.pdf,
//           })
//             .then(setFile)
//             .catch(handleError)
//         }}
//       />


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dropZone: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: '#999',
//   },
//   file: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ItemLoader;


import React, { useState } from 'react';

const ItemLoader = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);

  const handleFileSelection = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'text/csv')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid file');
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.items[0].getAsFile();

    if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'text/csv')) {
      setSelectedFile(file);
    } else {
      alert('Please drop a valid file');
    }
  };

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleFileDrop}
    >
      <input
        type="file"
        onChange={handleFileSelection}
        accept=".xlsx, .csv"
      />
    </div>
  );
};

export default ItemLoader;