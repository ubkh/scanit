// import React from "react";
// import { expect, jest, test, describe } from "@jest/globals";
// import { render, screen, within, waitFor } from "test-utils";
// import {fireEvent} from "@testing-library/react-native";
// import { Context } from '../context/GlobalContext';

// import SignUpScreen from "../app/(auth)/signUp/index";

// let setUserID;


// describe('SignUpScreen', () => {

//     beforeEach(() => {
//         // don't actually wait for any timers to advance
//         jest.useFakeTimers();
//         setUserID = jest.fn(); // reset/clear before each test since it's a data store
//       });

//     test('renders correctly', async () => {
//         const screen = render(
//           <Context.Provider value={{ domain:"http://192.168.1.116:8000/", userID:1, setUserID }}> 
//               <SignUpScreen />
//           </Context.Provider> 
//         );
//         await waitFor(async () => {
//             expect(screen.getByText('Email')).toBeDefined();
//             expect(screen.getByText('Password')).toBeDefined();
     
//           })
//     //   expect(getByText('Forgot Password?')).toBeTruthy();
//     //   expect(getByText("Don't have an account? Create one")).toBeTruthy();
//     });
  
    
// });