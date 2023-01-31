import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState} from 'react';

function getTestList(setSampleText) {
  return fetch("http://localhost:8000/api/list")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    setSampleText(json[0].text);
    return json;
  })
  .catch((error) => {
    console.error(error);
  });
}

function HomeScreen() {
  const [sampleText, setSampleText] = useState("Hello, World!");
  return (
    <View style={styles.container}>
      <Text>{sampleText}</Text>
      <Text>&nbsp;</Text>
      <Pressable style = {styles.button} 
        onPress={() => getTestList(setSampleText)}>
          <Text style = {styles.text}>GET data</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
