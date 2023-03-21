import React from 'react';
import { Alert } from 'react-native';

import { expect, jest, test, describe } from "@jest/globals";

import { render, waitFor } from "test-utils";
import {fireEvent } from '@testing-library/react-native';
import CardDetails from '../app/(user)/(customer)/basket/payment';
//import { Context } from '../context/GlobalContext';



describe('CardDetails component', () => {
  test('renders all input fields', () => {

    const { getByPlaceholderText } = render(<CardDetails/>);

    const nameInput = getByPlaceholderText('Enter Name on Card');
    const cardNumberInput = getByPlaceholderText('Enter card number');
    const expiryMonthInput = getByPlaceholderText('MM');
    const expiryYearInput = getByPlaceholderText('YYYY');
    const cvvInput = getByPlaceholderText('Enter CVV');

    expect(nameInput).toBeDefined();
    expect(cardNumberInput).toBeDefined();
    expect(expiryMonthInput).toBeDefined();
    expect(expiryYearInput).toBeDefined();
    expect(cvvInput).toBeDefined();
  });

  test('updates input fields when typed in', () => {
    const { getByPlaceholderText, getByText } = render(<CardDetails />);

    const nameInput = getByPlaceholderText('Enter Name on Card');
    const cardNumberInput = getByPlaceholderText('Enter card number');
    const expiryMonthInput = getByPlaceholderText('MM');
    const expiryYearInput = getByPlaceholderText('YYYY');
    const cvvInput = getByPlaceholderText('Enter CVV');
    const submitButton = getByText('Pay Now');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(cardNumberInput, '1234567890123456');
    fireEvent.changeText(expiryMonthInput, '12');
    fireEvent.changeText(expiryYearInput, '2025');
    fireEvent.changeText(cvvInput, '123');
    //fireEvent.press(submitButton);

    expect(nameInput.props.value).toBe('John Doe');
    expect(cardNumberInput.props.value).toBe('1234567890123456');
    expect(expiryMonthInput.props.value).toBe('12');
    expect(expiryYearInput.props.value).toBe('2025');
    expect(cvvInput.props.value).toBe('123');
    
    fireEvent.press(submitButton);

    expect(nameInput).toBeDefined();
    expect(cardNumberInput).toBeDefined();
    expect(expiryMonthInput).toBeDefined();
    expect(expiryYearInput).toBeDefined();
    expect(cvvInput).toBeDefined();
    //expect(console.log).toHaveBeenCalledWith('Payment successful');
  });

  test('display card number error message', () => {
    const { getByPlaceholderText, getByText } = render(<CardDetails />);
    jest.spyOn(Alert, 'alert');

    const nameInput = getByPlaceholderText('Enter Name on Card');
    const cardNumberInput = getByPlaceholderText('Enter card number');
    const expiryMonthInput = getByPlaceholderText('MM');
    const expiryYearInput = getByPlaceholderText('YYYY');
    const cvvInput = getByPlaceholderText('Enter CVV');
    const submitButton = getByText('Pay Now');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(cardNumberInput, '123456789012345678');
    fireEvent.changeText(expiryMonthInput, '12');
    fireEvent.changeText(expiryYearInput, '2025');
    fireEvent.changeText(cvvInput, '123');
    fireEvent.press(submitButton);

    expect(Alert.alert).toHaveBeenCalledWith('Invalid card number', 'Please enter a valid 16-digit card number');

    expect(nameInput).toBeDefined();
    expect(cardNumberInput).toBeDefined();
    expect(expiryMonthInput).toBeDefined();
    expect(expiryYearInput).toBeDefined();
    expect(cvvInput).toBeDefined();
  });


});
