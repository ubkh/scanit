import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "@rneui/base";
import ContainerStyle from "../../styles/ContainerStyle";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarCodeScanComponent from "../../components/BarCodeScanComponent";
import StoreAddItemForm from "../../components/StoreAddItemForm";

const Stack = createStackNavigator();

function StoreAddItem() {
  const navigation = useNavigation();
  return (
    <View style={ContainerStyle.container}>
      <Text>
        Scan the item's barcode. If the item already exists in the system,
        details will be loaded. Alternatively, you can enter the item's details
        manually.
      </Text>
      <Button
        onPress={() => "Not implemented yet"}
        title="Scan barcode"
      ></Button>
      <Button
        containerStyle={{
          width: 200,
          margin: 10,
        }}
        title="Enter details manually"
        type="clear"
        onPress={() => navigation.navigate("StoreAddItemForm")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function StoreAddItemStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreAddItem"
        component={StoreAddItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarCodeScanComponent"
        component={BarCodeScanComponent}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="StoreAddItemForm"
        component={StoreAddItemForm}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
}

export default StoreAddItemStack;
