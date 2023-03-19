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
      height: 40,
      //borderColor: '#ccc',
      // borderWidth: 1,
      // borderRadius: 5,
      // paddingHorizontal: 10,
      // marginBottom: 10,

    },
    inputMonth: {
      height: 40,
      //borderColor: '#ccc',
      // borderWidth: 1,
      // borderRadius: 5,
      paddingHorizontal: 10,
      // marginBottom: 10,
      justifyContent: 'flex-start',
    },
    inputYear: {
      height: 40,
      //borderColor: '#ccc',
      // borderWidth: 1,
      // borderRadius: 5,
       paddingHorizontal: 10,
      // marginBottom: 10,
      justifyContent: 'flex-end',
    },
    button: {
      backgroundColor: '#50C878',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  export default PaymentStyle;