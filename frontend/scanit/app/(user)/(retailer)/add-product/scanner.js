import RetailerBarcodeScanner from "../../../../components/RetailerBarcodeScanner";
import { View } from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";

export default function Scanner() {
  return (
    <View style={BarCodeScanStyle.container}>
      <RetailerBarcodeScanner />
    </View>
  );
}
