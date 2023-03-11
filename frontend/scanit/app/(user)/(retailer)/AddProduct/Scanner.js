import RetailerBarcodeScanner from "../../../../components/RetailerBarcodeScanner";
import { View } from "native-base";
import ContainerStyle from "../../../../styles/ContainerStyle";

export default function Scanner() {
  return (
    <View style={ContainerStyle.container}>
      <RetailerBarcodeScanner />
    </View>
  );
}
