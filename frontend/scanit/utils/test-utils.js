import {render} from '@testing-library/react-native'
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "../context/AuthContext";
import ContextProvider from "../context/GlobalContext";

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Providers = ({children}) => {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
        <AuthProvider>
        <ContextProvider>
            {children}
        </ContextProvider>
        </AuthProvider>
    </NativeBaseProvider>
  )
}


const customRender = (ui, options) =>
  render(ui, {wrapper: Providers, ...options})


// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}

