import StoreAddItemForm from "../../../../components/StoreAddItemForm";
import { View } from "native-base";
import ContainerStyle from "../../../../styles/ContainerStyle";

export default function Form() {
  return (
    <View style={ContainerStyle.container}>
      <StoreAddItemForm />
    </View>
  );
}
