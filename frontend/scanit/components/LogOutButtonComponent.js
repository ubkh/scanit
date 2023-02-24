import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { Button } from "native-base";

const LogOutButton = ({ style }) => {
    const { signOut } = useAuth();
    const router = useRouter();

    return (
       <Button
        bg="red.500"
        style = {[{}, style]}
        onPress={ (ev) => {
            signOut();
            router.push("/login");
        }}>
            Log Out
        </Button>
    );
  }

export default LogOutButton;