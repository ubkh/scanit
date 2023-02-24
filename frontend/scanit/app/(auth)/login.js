import { Text, View } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { Button } from "native-base";

export default function LogIn() {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 24, fontSize: 36, fontWeight: "bold" }}>
        ScanIt
      </Text>
      <Button bg="brand.400" onPress={signIn}>
        Log In
      </Button>
    </View>
  );
}
