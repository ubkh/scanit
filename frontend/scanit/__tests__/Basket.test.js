import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Context } from '../context/GlobalContext';
import Basket from '../app/(user)/(customer)/Basket';
import { NativeBaseProvider } from 'native-base';

describe('Basket', () => {
  const basketList = [
    {
      data: '1234567890',
      type: '512',
      quantity: 2,
    },
    {
      data: '0987654321',
      type: '32',
      quantity: 1,
    },
  ];
  const setBasketList = jest.fn();

  it('renders empty basket message when basket is empty', () => {
    const { getByText } = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList: [], setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    expect(getByText('Your basket is empty')).toBeDefined();
  });

  it('renders basket items when basket is not empty', () => {
    const { getByText, getByTestId } = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    expect(getByText(`${basketList.length} products`)).toBeDefined();
    expect(getByTestId('numeric-input-0')).toBeDefined();
    expect(getByTestId('numeric-input-1')).toBeDefined();
    expect(getByTestId('remove-button-0')).toBeDefined();
    expect(getByTestId('remove-button-1')).toBeDefined();
  });

  it('calls handleQuantityChange when numeric input value is changed', () => {
    const { getByTestId } = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    const numericInput = getByTestId('numeric-input-0');
    fireEvent.changeText(numericInput, '3');
    expect(setBasketList).toHaveBeenCalledWith([
      {
        data: '1234567890',
        type: '512',
        quantity: 3,
      },
      {
        data: '0987654321',
        type: '32',
        quantity: 1,
      },
    ]);
  });

  it('calls removeItem when remove button is pressed', () => {
    const { getByTestId } = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    const removeButton = getByTestId('remove-button-0');
    fireEvent.press(removeButton);
    expect(setBasketList).toHaveBeenCalledWith([
      {
        data: '0987654321',
        type: '32',
        quantity: 1,
      },
    ]);
  });

  it('shows alert when quantity input is less than 1', () => {
    const { getByTestId } = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    const numericInput = getByTestId('numeric-input-0');
    fireEvent.changeText(numericInput, '0');
    expect(setBasketList).not.toHaveBeenCalled();
    expect(getByText('Quantity must be 1 or more!')).toBeDefined();
  });
});
