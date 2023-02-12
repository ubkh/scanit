import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "@rneui/base";
import ContainerStyle from "../../styles/ContainerStyle";

function StoreAddItem(props) {
  return (
    <View style={ContainerStyle.container}>
      <Text>
        Scan the item's barcode. Alternatively, you can enter the item's details
        manually.
      </Text>
      <Button onPress={() => ""} title="Scan barcode"></Button>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        title="Enter details manually"
        type="clear"
        titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default StoreAddItem;
