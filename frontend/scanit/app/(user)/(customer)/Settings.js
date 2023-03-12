import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeButton from '../../../components/ThemeButton';
import { Context } from '../../../context/GlobalContext';
import LogOutButton from '../../../components/LogOutButtonComponent';

function Another(props) {
    const globalContext = useContext(Context);
    const { isLoggedIn, logIn } = globalContext;

    return (
        <View style={styles.container}>
            <Text>Another screen!</Text>
            <Text>You are {(isLoggedIn)? '' : "not "}logged in</Text>
            <ThemeButton />
            {Platform.OS !== 'web' && <LogOutButton />}
        </View>
    );
}

// custom css
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'orange',
    },
});

  
export default Another;