import React from "react";
import { expect, jest, test, describe } from "@jest/globals";
import { render, screen, within, waitFor,act } from "test-utils";
import {fireEvent} from "@testing-library/react-native";
import { Context } from '../context/GlobalContext';
import { Link } from 'expo-router';
import SignUpScreen from '../app/(auth)/signUp/index';

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
          <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
              <SignUpScreen />
          </Context.Provider> 
        );
        await waitFor(async () => {
            expect(screen.getByText('First name')).toBeDefined();
            expect(screen.getByText('Last name')).toBeDefined();
            expect(screen.getByText('Email')).toBeDefined();
            // expect(screen.getByText('Store address')).toBeDefined();
            expect(screen.getByText('Phone number')).toBeDefined();
            expect(screen.getByText('Password')).toBeDefined();
            expect(screen.getByText('Confirm password')).toBeDefined();
            expect(screen.getByText('Sign Up')).toBeDefined();

          })
    });

    test('shows error messages when form submitted with invalid data on customer side', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneNumberInput = screen.getByPlaceholderText('Phone number');
      const passwordInput = screen.getByPlaceholderText('Password');
      const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Sign Up');

      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(phoneNumberInput, '1234567890');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.changeText(passwordConfirmInput, 'password');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('Not a valid email')).toBeDefined();
          expect(screen.getByText('Number can only contain 11 numerals')).toBeDefined();
          expect(screen.getByText('Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character')).toBeDefined();

        })
  });

    test('shows error messages when form submitted with blank data on customer side', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneNumberInput = screen.getByPlaceholderText('Phone number');
      const passwordInput = screen.getByPlaceholderText('Password');
      const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Sign Up');

      fireEvent.changeText(firstNameInput, '');
      fireEvent.changeText(lastNameInput, '');
      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(phoneNumberInput, '');
      fireEvent.changeText(passwordInput, '');
      fireEvent.changeText(passwordConfirmInput, '');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('First name is required')).toBeDefined();
          expect(screen.getByText('Last name is required')).toBeDefined();
          expect(screen.getByText('Email is required')).toBeDefined();
          expect(screen.getByText('Phone number is required')).toBeDefined();
          expect(screen.getByText('Password is required')).toBeDefined();
        })
  });
    
    test('shows error messages when form submitted with mismatching passwords on retailer side', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneNumberInput = screen.getByPlaceholderText('Phone number');
      const passwordInput = screen.getByPlaceholderText('Password');
      const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Sign Up');

      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'Johnny123@gmail.com');
      fireEvent.changeText(phoneNumberInput, '12345678901');
      fireEvent.changeText(passwordInput, 'Password.1');
      fireEvent.changeText(passwordConfirmInput, 'Password.2');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('Passwords do not match')).toBeDefined();

        })
  });

    test('renders retailer sign up form', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const retailer = screen.getByText('Retailer');
      fireEvent.press(retailer)

      await waitFor(async () => {
          expect(screen.getByText('First name')).toBeDefined();
          expect(screen.getByText('Last name')).toBeDefined();
          expect(screen.getByText('Email')).toBeDefined();
          expect(screen.getByText('Store address')).toBeDefined();
          expect(screen.getByText('Phone number')).toBeDefined();
          expect(screen.getByText('Password')).toBeDefined();
          expect(screen.getByText('Confirm password')).toBeDefined();
          expect(screen.getByText('Sign Up')).toBeDefined();
        })
  });

    test('shows error messages when form submitted with invalid data on retailer side', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const retailer = screen.getByText('Retailer');
      fireEvent.press(retailer)

      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneNumberInput = screen.getByPlaceholderText('Phone number');
      const addressInput = screen.getByPlaceholderText('Store address');
      const passwordInput = screen.getByPlaceholderText('Password');
      const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Sign Up');

      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(phoneNumberInput, '1234567890');
      fireEvent.changeText(addressInput,'999 burger road')
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.changeText(passwordConfirmInput, 'password');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('Not a valid email')).toBeDefined();
          expect(screen.getByText('Number can only contain 11 numerals')).toBeDefined();
          expect(screen.getByText('Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character')).toBeDefined();

        })
  });

    test('shows error messages when form submitted with invalid data on retailer side', async () => {
      const screen = render(
        <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
            <SignUpScreen />
        </Context.Provider> 
      );
      const retailer = screen.getByText('Retailer');
      fireEvent.press(retailer)

      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneNumberInput = screen.getByPlaceholderText('Phone number');
      const addressInput = screen.getByPlaceholderText('Store address');
      const passwordInput = screen.getByPlaceholderText('Password');
      const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Sign Up');

      fireEvent.changeText(firstNameInput, '');
      fireEvent.changeText(lastNameInput, '');
      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(phoneNumberInput, '');
      fireEvent.changeText(addressInput,'')
      fireEvent.changeText(passwordInput, '');
      fireEvent.changeText(passwordConfirmInput, '');
      fireEvent.press(submitButton)

      await waitFor(async () => {
          expect(screen.getByText('First name is required')).toBeDefined();
          expect(screen.getByText('Last name is required')).toBeDefined();
          expect(screen.getByText('Email is required')).toBeDefined();
          expect(screen.getByText('Phone number is required')).toBeDefined();
          expect(screen.getByText('Address is required')).toBeDefined();
          expect(screen.getByText('Password is required')).toBeDefined();
        })
  });
    
  //   test('render new screen on link click', async () => {
  //     const screen = render(
  //       <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
  //           <SignUpScreen />
  //       </Context.Provider> 
  //     );
  //     const link = screen.getByText('Sign in');
  //     fireEvent.press(link);

  //     await waitFor(async () => {
  //         expect(screen.getByText('Sign In')).toBeDefined();

  //       })
  // });
    // test('calls fetch with correct arguments when form is submitted', async () => {
    //   // Arrange
    //   const mockData = {
    //     email: 'test@example.com',
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     number: '12345678901',
    //     store_address: '101 burger road',
    //     password: 'Password123!'
    //   };
    //   // const mockResponse = {
    //   //   ok: true,
    //   //   json: () => Promise.resolve({ user_id: 123 })
    //   // };
    //   // const fetchMock = jest.fn().mockResolvedValue(mockResponse);
    //   // global.fetch = fetchMock;
    //   const { getByPlaceholderText, getByText } = render(
    //     <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
    //         <SignUpScreen />
    //     </Context.Provider> 
    //   );

    //   const retailer = screen.getByText('Retailer');
    //   fireEvent.press(retailer)

    //   // Act
    //   fireEvent.changeText(getByPlaceholderText('First name'), mockData.first_name);
    //   fireEvent.changeText(getByPlaceholderText('Last name'), mockData.last_name);
    //   fireEvent.changeText(getByPlaceholderText('Email'), mockData.email);
    //   fireEvent.changeText(getByPlaceholderText('Phone number'), mockData.number);
    //   fireEvent.changeText(getByPlaceholderText('Store address'), mockData.store_address);
    //   fireEvent.changeText(getByPlaceholderText('Password'), mockData.password);
    //   fireEvent.changeText(getByPlaceholderText('Email'), mockData.confirm_password);

    //   fireEvent.press(getByText('Sign Up'));
    //   // await act(() => waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1)));

    //   // // Assert
    //   // expect(fetchMock).toHaveBeenCalledWith("http://192.168.1.116:8000/api/user/register/", {
    //   //   method: 'POST',
    //   //   credentials: 'same-origin',
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   },
    //   //   body: JSON.stringify(mockData)
    //   await waitFor(async () => {
    //     expect(screen.getByText('Home')).toBeDefined();

      
    //   });
    // });
  
    
});