import BarCodeScanComponent from "../../../../components/BarCodeScanComponent";
import { View, Center } from "native-base";

export default function Scan() {
    return (
        <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
            <Center alignSelf="center">
                <BarCodeScanComponent />
            </Center>
        </View>
    )
}