import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Context } from '../context/GlobalContext';
import Basket from '../app/(user)/(customer)/Basket';

describe('Basket', () => {
  it('should display "Your basket is empty" when basketList is empty', () => {
    const { getByText } = render(<Basket />);
    expect(getByText('Your basket is empty')).toBeTruthy();
  });

  it('should display the number of products in the basket', () => {
    const basketList = [
      { data: '123456', type: '32', quantity: 2 },
      { data: '654321', type: '512', quantity: 1 },
    ];
    const { getByText } = render(<Basket basketList={basketList} />);
    expect(getByText('2 products')).toBeTruthy();
  });

  it('should call handleQuantityChange when quantity is changed', () => {
    const basketList = [{ data: '123456', type: '32', quantity: 1 }];
    const handleQuantityChange = jest.fn();
    const { getByTestId } = render(
      <Basket basketList={basketList} handleQuantityChange={handleQuantityChange} />
    );
    const quantityInput = getByTestId('numeric-input-0');
    fireEvent.changeText(quantityInput, '2');
    expect(handleQuantityChange).toHaveBeenCalledWith(0, 2);
  });

  it('should call removeItem when remove button is pressed', () => {
    const basketList = [
        { data: '123456', type: '32', quantity: 1 },
        { data: '654321', type: '512', quantity: 2 },
    ];
    const removeItem = jest.fn();
    const { getByTestId } = render(<Basket basketList={basketList} removeItem={removeItem} />);
    const removeButton = getByTestId('remove-button-1');
    fireEvent.press(removeButton);
    expect(removeItem).toHaveBeenCalledWith(1);
  });
});

