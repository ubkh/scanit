import { StyleSheet } from 'react-native';

const BarCodeScanStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
    }
  });

export default BarCodeScanStyle;