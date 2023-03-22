import RetailerProductForm from "../../../../components/RetailerProductForm";
import { View } from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";

export default function Form() {
  return (
    <View
      style={BarCodeScanStyle.container}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      <RetailerProductForm />
    </View>
  );
}
