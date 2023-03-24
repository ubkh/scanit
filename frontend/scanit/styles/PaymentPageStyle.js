import { StyleSheet } from 'react-native';


const PaymentStyle = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      height: 50,
    },
    inputMonth: {
      height: 50,
      paddingHorizontal: 10,
      justifyContent: 'flex-start',
    },
    inputYear: {
      height: 50,
       paddingHorizontal: 10,
      justifyContent: 'flex-end',
    },
    button: {
      backgroundColor: '#50C878',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  export default PaymentStyle;