import BarCodeScanComponent from "../../../../components/BarCodeScanComponent";
import { View, Text } from "native-base";
import ContainerStyle from "../../../../styles/ContainerStyle";

export default function Scan() {
    return (
        <View style={ContainerStyle.container}>
            <BarCodeScanComponent />
        </View>
    )
}