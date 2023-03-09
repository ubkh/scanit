import React from 'react';
import { render, fireEvent, screen, waitFor} from "test-utils";
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

  beforeEach(() => {
    // don't actually wait for any timers to advance
    jest.useFakeTimers();
  });


  const setBasketList = jest.fn();

  it('renders empty basket message when basket is empty', async () => {
    const screen = render(
      <NativeBaseProvider>
        <Context.Provider value={{ basketList: [], setBasketList }}>
          <Basket />
        </Context.Provider>
      </NativeBaseProvider>,
    );
    screen.debug();
    await waitFor(async () => {
      // make assertion  using global 'screen'
      expect(screen.getByText('Your basket is empty')).toBeDefined();
    });     
  });
  

  it('renders basket items when basket is not empty', async () => {
    const screen = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    await waitFor(async () => {
      expect(screen.getByText(`${basketList.length} products`)).toBeDefined();
      expect(screen.getByTestId('numeric-input-0')).toBeDefined();
      expect(screen.getByTestId('numeric-input-1')).toBeDefined();
      expect(screen.getByTestId('remove-button-0')).toBeDefined();
      expect(screen.getByTestId('remove-button-1')).toBeDefined();
    })
    
  });

  it('calls handleQuantityChange when numeric input value is changed', async () => {
    const screen = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );
    
    await waitFor(async () => {
      const numericInput = screen.getByTestId('numeric-input-0');
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
    })
    
  });

  it('calls removeItem when remove button is pressed', async () => {
    const screen = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );

    await waitFor(async () => {
      const removeButton = getByTestId('remove-button-0');
      fireEvent.press(removeButton);
      expect(setBasketList).toHaveBeenCalledWith([
        {
          data: '0987654321',
          type: '32',
          quantity: 1,
        },
      ]);
    })
  });

  it('shows alert when quantity input is less than 1', async () => {
    const screen = render(
    <NativeBaseProvider>
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    </NativeBaseProvider>,
    );

    await waitFor(async () => {
      const numericInput = screen.getByTestId('numeric-input-0');
      fireEvent.changeText(numericInput, '0');
      expect(setBasketList).not.toHaveBeenCalled();
      expect(screen.getByText('Quantity must be 1 or more!')).toBeDefined();
    })

  });

});
