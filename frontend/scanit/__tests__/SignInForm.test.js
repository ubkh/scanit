import React from "react";
import { expect, jest, test, describe } from "@jest/globals";
import { render, screen, within, waitFor,act } from "test-utils";
import {fireEvent} from "@testing-library/react-native";
import ForgotPasswordScreen from '../app/(auth)/signIn/forgotPass';

import { useRouter } from "expo-router";

import { Context } from '../context/GlobalContext';
import { Link } from 'expo-router';
import SignInScreen from '../app/(auth)/signIn/index';

let setUserID;
jest.mock("expo-router");


describe('Sign Up Screen', () => {

    beforeEach(() => {
        // don't actually wait for any timers to advance
        jest.useFakeTimers();
        setUserID = jest.fn(); // reset/clear before each test since it's a data store
      });

    test('renders correctly', async () => {
        const screen = render(
              <SignInScreen />
        );
        await waitFor(async () => {
            expect(screen.getByText('Email')).toBeDefined();
            expect(screen.getByText('Password')).toBeDefined();
            expect(screen.getByText('Sign In')).toBeDefined();
            expect(screen.getByText("Don't have an account? Create one")).toBeDefined();
          })
    });

    test('shows error messages when form submitted with invalid data', async () => {
      const screen = render(
            <SignInScreen />
      );
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByText('Sign In');

      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'pass');

      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('Password should contain atleast 8 characters')).toBeDefined();

        })
  });

    test('shows error messages when form submitted with blank data on customer side', async () => {
      const screen = render(
            <SignInScreen />
      );
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByText('Sign In');

      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(passwordInput, '');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('Email is required')).toBeDefined();
          expect(screen.getByText('Password is required')).toBeDefined();
        })
  });
    
    test('shows error messages when form submitted with mismatching passwords on retailer side', async () => {
      const screen = render(
            <SignInScreen />
      );
      const link = screen.getByText("Don't have an account? Create one");
      fireEvent.press(link);

      await waitFor(() => {
        expect(screen.getByText('First name')).toBeDefined();
      }, { timeout: 10000 });
  });

    test("navigates to Forgot Password screen when 'Forgot Password?' button is pressed", async () => {
     
        const { getByText} = render(<SignInScreen />);

        const forgotPasswordButton = getByText('Forgot Password?');
        fireEvent.press(forgotPasswordButton);
        await waitFor(() => {
            expect(getByText('Reset')).toBeDefined();
          }, { timeout: 10000 });
  
// expect(useRouter().push).toHaveBeenCalledWith("/signIn/forgotPass");
    });
//     test('renders retailer sign up form', async () => {
//       const screen = render(
//         <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
//             <SignUpScreen />
//         </Context.Provider> 
//       );
//       const retailer = screen.getByText('Retailer');
//       fireEvent.press(retailer)

//       await waitFor(async () => {
//           expect(screen.getByText('First name')).toBeDefined();
//           expect(screen.getByText('Last name')).toBeDefined();
//           expect(screen.getByText('Email')).toBeDefined();
//           expect(screen.getByText('Store address')).toBeDefined();
//           expect(screen.getByText('Phone number')).toBeDefined();
//           expect(screen.getByText('Password')).toBeDefined();
//           expect(screen.getByText('Confirm password')).toBeDefined();
//           expect(screen.getByText('Sign Up')).toBeDefined();
//         })
//   });
});