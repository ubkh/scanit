import RetailerAddProductForm from "../../../../components/RetailerAddProductForm";
import { View } from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";

export default function Form() {
  return (
    <View style={BarCodeScanStyle.container}>
      <RetailerAddProductForm />
    </View>
  );
}
