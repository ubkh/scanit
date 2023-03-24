import { Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

function Index() {
    const { userType } = useAuth();

    // if user is a customer redirect to their home
    if (userType === "customer") {
        return (
            <Redirect href="/(customer)/home" />
        )
    } 
    // otherwise redirect to the retailer home
    return (
        <Redirect href="/(retailer)/home" />
    )
    
}

export default Index;