import React from "react";
import { Context } from '../context/GlobalContext';
import { expect, jest, test, describe } from "@jest/globals";
import {useRouter} from 'expo-router'
import {fireEvent} from "@testing-library/react-native";
import { render, screen, within, waitFor,act } from "test-utils";
import AssignStaffPage from "../app/(user)/(retailer)/assignStaff";


jest.mock("expo-router");


describe("assignStaffPage", () => {
    let globalContextMock;

    // run this before each test
    beforeEach(() => {
      // don't actually wait for any timers to advance
      jest.useFakeTimers();
      setUserID = jest.fn(); // reset/clear before each test since it's a data store

    });
  
    //   test('should call the API and redirect to home page on successful registration', async () => {
    //     const pushMock = jest.fn();
    //     const replaceMock = jest.fn();
    //     const backMock = jest.fn();
    //     useRouter.mockReturnValue({
    //       push: pushMock,
    //       replace: replaceMock,
    //       back: backMock,
    //     });
    
    //     const { getByPlaceholderText, getByText } = render(
    //       <Context.Provider value={globalContextMock}>
    //         <AssignStaffPage />
    //       </Context.Provider>,
    //     );
    
    //     // Fill in the registration form
    //     fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    //     fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    //     fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com');
    //     fireEvent.changeText(getByPlaceholderText('Password'), 'Password1234$');
    
    //     // Click the Assign button
    //     fireEvent.press(getByText('Assign'));
    
    //     // Wait for the API call to finish
    //     await new Promise((resolve) => setTimeout(resolve, 100));
    
    //     // Check that the API was called with the correct data
    //     // expect(fetch).toHaveBeenCalledTimes(1);
    //     // expect(fetch).toHaveBeenCalledWith('http://example.com/api/staff/register/', {
    //     //   method: 'POST',
    //     //   credentials: 'same-origin',
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //   },
    //     //   body: JSON.stringify({
    //     //     email: 'john.doe@example.com',
    //     //     first_name: 'John',
    //     //     last_name: 'Doe',
    //     //     number: '',
    //     //     store_address: '',
    //     //     password: 'Password1234$',
    //     //   }),
    //     // });
    
    //     // Check that the userID was set and the router was called to redirect to home page
    //     // expect(globalContextMock.setUserID).toHaveBeenCalledTimes(1);
    //     // expect(globalContextMock.setUserID).toHaveBeenCalledWith('123');
    //     expect(pushMock).toHaveBeenCalledTimes(1);
    //     expect(pushMock).toHaveBeenCalledWith('/home');
    //   });
  

    test("renders correctly", async () => {
        const { getByPlaceholderText, getByText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        expect(getByPlaceholderText('First name')).toBeDefined();
        expect(getByPlaceholderText('Last name')).toBeDefined();
        expect(getByPlaceholderText('Email')).toBeDefined();
        expect(getByPlaceholderText('Password')).toBeDefined();
        expect(getByText('Assign staff')).toBeDefined();
      });    
  
      test('should show an error message when the form is submitted with missing first name', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Assign staff');

        act(() => {
            fireEvent.changeText(firstNameInput, '');
            fireEvent.changeText(lastNameInput, 'Doe');
            fireEvent.changeText(emailInput, 'john@example.com');
            fireEvent.changeText(passwordInput, 'Password1!');
        
            fireEvent.press(submitButton);
          });
        
    
        await waitFor(() => {
            expect(getByText('First name is required')).toBeDefined();
          }, { timeout: 10000 });
      });


    test('should show an error message when the form is submitted with missing last name', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Assign staff');
    

        act(() => {
            fireEvent.changeText(firstNameInput, 'John');
            fireEvent.changeText(lastNameInput, '');
            fireEvent.changeText(emailInput, 'john@example.com');
            fireEvent.changeText(passwordInput, 'Password1!');
        
            fireEvent.press(submitButton);
          });
    
        await waitFor(() => {
            expect(getByText('Last name is required')).toBeDefined();
          }, { timeout: 10000 });
      });

    test('should show an error message when the form is submitted with missing email', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Assign staff');
    
        act(() => {
            fireEvent.changeText(firstNameInput, 'John');
            fireEvent.changeText(lastNameInput, 'Doe');
            fireEvent.changeText(emailInput, '');
            fireEvent.changeText(passwordInput, 'Password1!');
        
            fireEvent.press(submitButton);
          });

    
        await waitFor(() => {
            expect(getByText('Email is required')).toBeDefined();
          }, { timeout: 10000 });
      });

    test('should show an error message when the form is submitted with missing password', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Assign staff');
    
        act(() => {
            fireEvent.changeText(firstNameInput, 'John');
            fireEvent.changeText(lastNameInput, 'Doe');
            fireEvent.changeText(emailInput, 'john@example.com');
            fireEvent.changeText(passwordInput, '');
        
            fireEvent.press(submitButton);
          });
    
        await waitFor(() => {
            expect(getByText('Password is required')).toBeDefined();
          }, { timeout: 10000 });
      });

    test('Should apply the value when changing text', () => {
        const screen = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const input = screen.getByPlaceholderText('Email');
        fireEvent.changeText(input, '123');
        expect(input.props.value).toBe('123');
    });

    test('Email must have correct format', () => {
        const screen = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const input = screen.getByPlaceholderText('Email');
        fireEvent.changeText(input, '123');
        expect(input.props.value).toBe('123');
    });

    test('email must be valid', async () => {

        const { getByPlaceholderText, getByText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const assignButton = getByText('Assign staff');

        act(() => {
            fireEvent.changeText(emailInput, 'invalid-email');
            fireEvent.changeText(passwordInput, 'password');
            fireEvent.press(assignButton);
          });

        await waitFor(() => {
            expect(getByText('Not a valid email')).toBeDefined();
          }, { timeout: 10000 });
  
    });

    test('should show an error message when the form is submitted with a weak password', async () => {

        const { getByPlaceholderText, getByText } = render(
            <Context.Provider value={{ domain:'domain', userID:1, setUserID }}> 
                <AssignStaffPage />
            </Context.Provider> );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const assignButton = getByText('Assign staff');

        act(() => {
            fireEvent.changeText(emailInput, 'johndoe@gmail.com');
            fireEvent.changeText(passwordInput, 'shush');
            fireEvent.press(assignButton);
          });

        await waitFor(() => {
            expect(getByText('Password should contain atleast 8 characters \n - An uppercase character \n - A lower case character \n - A number \n - A special character')).toBeDefined();
          }, { timeout: 10000 });
    
    });

    // test('should should redirect to home once staff is signed up', async () => {

    //     const { getByPlaceholderText, getByText } = render(<AssignStaffPage />);
    //     const firstNameInput = getByPlaceholderText('First name');
    //     const lastNameInput = getByPlaceholderText('Last name');
    //     const emailInput = getByPlaceholderText('Email');
    //     const passwordInput = getByPlaceholderText('Password');
    //     const submitButton = getByText('Assign');
    //     act(() => {
    //         fireEvent.changeText(firstNameInput, 'John');
    //         fireEvent.changeText(lastNameInput, 'Doe');
    //         fireEvent.changeText(emailInput, 'johny@example.com');
    //         fireEvent.changeText(passwordInput, 'Password.123');
        
    //         fireEvent.press(submitButton);
    //       });

    //     await waitFor(() => {
    //         // expect(Router.push).toHaveBeenCalledWith('/home')
    //         expect(getByText('Assign staff')).toBeDefined();
    //       }, { timeout: 30000 });
    
    // });

    // test('displays an error message when the Assign API request fails', async () => {
    //     jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject());
    //     const { getByPlaceholderText, getByText } = render(<AssignStaffPage />);
    //     fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    //     fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    //     fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com');
    //     fireEvent.changeText(getByPlaceholderText('Password'), 'P@ssword123');
    //     fireEvent.press(getByText('Assign'));
    //     await waitFor(() => {
    //       const errorLabel = getByText('user already exists');
    //       expect(errorLabel).toBeDefined();
    //     });
    //     global.fetch.mockRestore();
    //   });

    // test('calls onRegisterPressed function when Assign button is pressed', async () => {

    //     const mockOnRegisterPressed = jest.fn();
    //     const { getByText } = render(<AssignStaffPage onRegisterPressed={mockOnRegisterPressed} />);

    //     // const { getByText, getByPlaceholderText } = render(<AssignStaffPage />);
    //     const assignButton = getByText('Assign');
    //     const emailInput = getByPlaceholderText('Email');
    //     const firstNameInput = getByPlaceholderText('First name');
    //     const lastNameInput = getByPlaceholderText('Last name');
    //     const passwordInput = getByPlaceholderText('Password');
    //     fireEvent.changeText(emailInput, 'test@example.com');
    //     fireEvent.changeText(firstNameInput, 'John');
    //     fireEvent.changeText(lastNameInput, 'Doe');
    //     fireEvent.changeText(passwordInput, 'Test123@');
    //     await fireEvent.press(assignButton);
    //     expect(mockOnRegisterPressed).toHaveBeenCalled();
    //   });
    

    
  
  
    
    
  
    // test('displays error message when registration fails', async () => {
    //     const mockOnRegisterPressed = jest.fn();
    //     const mockFetch = jest.fn();
    //     mockFetch.mockRejectedValueOnce({ message: 'User already exists' });
    //     global.fetch = mockFetch;
      
    //     const { getByText, getByPlaceholderText } = render(
    //       <AssignStaffPage onRegisterPressed={mockOnRegisterPressed} />
    //     );
    //     const assignButton = getByText('Assign');
    //     const emailInput = getByPlaceholderText('Email');
    //     const firstNameInput = getByPlaceholderText('First name');
    //     const lastNameInput = getByPlaceholderText('Last name');
    //     const passwordInput = getByPlaceholderText('Password');
    //     fireEvent.changeText(emailInput, 'test@example.com');
    //     fireEvent.changeText(firstNameInput, 'John');
    //     fireEvent.changeText(lastNameInput, 'Doe');
    //     fireEvent.changeText(passwordInput, 'Test123@');
    //     await fireEvent.press(assignButton);
    //     const errorLabel = getByText('User already exists');
    //     expect(errorLabel).toBeInTheDocument();
    //   });



    });
  
