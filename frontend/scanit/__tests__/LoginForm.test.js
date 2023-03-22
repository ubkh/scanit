import React from "react";
import { expect, jest, test, describe } from "@jest/globals";
import { render, screen, within, waitFor,fireEvent } from "test-utils";
import SignUpScreen from "../app/(auth)/signUp/index";



describe('SignUpScreen', () => {
    test('renders correctly', () => {
      const { getByPlaceholderText, getByText } = render(<SignUpScreen />);
      
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
    //   expect(getByText('Forgot Password?')).toBeTruthy();
    //   expect(getByText("Don't have an account? Create one")).toBeTruthy();
    });
  
    
  });