import { Redirect } from "expo-router";
import { useContext } from "react";
import { Context } from "../../context/GlobalContext";

function Index() {
    const globalContext = useContext(Context);
    const userType = globalContext.userType;

    // TODO: Implement correctly!
    // maybe use the AuthContext to check if the user is a customer or retailer using a hook
    // or store directly in the user object in AuthContext?
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