import React from "react";
import { render, screen, within, waitFor } from "test-utils";

import Home from "../app/(user)/(retailer)/home";
import Other from "../app/(user)/(retailer)/other";

//import { render } from "@testing-library/react-native";

import { useSegments } from "expo-router";
import { act } from "react-test-renderer";
import { create } from "react-test-renderer";

import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "../context/AuthContext";
import ContextProvider from "../context/GlobalContext";

jest.mock("expo-router");

// jest.mock("native-base");


// jest.mock('@react-native-async-storage/async-storage', () => ({
//   useAsyncStorage: jest.fn(),
// }));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

// jest.mock("@react-native-async-storage/async-storage", () => ({
//   useAsyncStorage: jest.fn(),
// }));

//const mockGetItem = jest.spyOn(require("@react-native-async-storage/async-storage"), "getItem");
//mockGetItem.mockResolvedValue('{"id":1,"username":"testuser"}'); // mock some test data


describe("Home", () => {
  // const useSegments = jest.fn();
  // jest.spyOn(expoRouter, 'useSegments').mockImplementation(() => ({
  //   useSegments,
  // }));

  // useSegments.mockReturnValue(``);
  beforeEach(() => {
    jest.useFakeTimers();
    //jest.resetModules();
  
  });

  it("renders correctly", async () => {
    // const mockUser = { name: "John Doe" };
    // const getItem = jest.fn().mockResolvedValue(null);
    // const useAsyncStorageMock = () => ({ getItem });
    // jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    // let component;
    // component = render(<Home useAsyncStorage={useAsyncStorageMock} />);
    // useAsyncStorage.mockReturnValueOnce({
    //   getItem: jest.fn().mockResolvedValueOnce(JSON.stringify("USER")),
    //   setItem: jest.fn().mockResolvedValueOnce(),
    //   removeItem: jest.fn().mockResolvedValueOnce(),
    // });
    
    render(<Home />);

    await waitFor(async () => {
      expect(screen.getByText("Home")).toBeDefined();
    });
    //render(<Other />);
    

  });
  // test("renders correctly", () => {
  //   const component = (
  //     <NativeBaseProvider initialWindowMetrics={inset}>
  //         <AuthProvider>
  //           <ContextProvider>
  //             <Home />
  //           </ContextProvider>
  //         </AuthProvider>
  //       </NativeBaseProvider>
  //   );


  //   //component = render(<Other />);
  //   jest.spyOn(React, "useEffect").mockImplementation((f) => f());

  //   render(component);

  //   // await act( async () => {
  //   //   component = create(
  //   //     <NativeBaseProvider initialWindowMetrics={inset}>
  //   //       <AuthProvider>
  //   //         <ContextProvider>
  //   //           <Home />
  //   //         </ContextProvider>
  //   //       </AuthProvider>
  //   //     </NativeBaseProvider>
  //   //   );
  //   // });
  //  });

  test('renders the Home screen', async () => {
    let component;

    await act( async () => {
      component = create(
        <NativeBaseProvider initialWindowMetrics={inset}>
          <AuthProvider>
            <ContextProvider>
              <Home />
            </ContextProvider>
          </AuthProvider>
        </NativeBaseProvider>
      );
    });
    
    const view = within(component.root);
    
    const homeHeading = view.getByText("Home");
    const homeText = view.getByText('You are in the retailer home!');

    // make assertions
    expect(homeHeading).toBeDefined();
    expect(homeText).toBeDefined();
  });
  
  
});