import React from 'react';
import { render, waitFor } from "test-utils";
import { Context } from '../context/GlobalContext';
import Basket from '../app/(user)/(customer)/basket/Basket';
import { fireEvent } from "@testing-library/react-native";

import { Alert } from 'react-native';

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

  let setBasketList;


  beforeEach(() => {
    // don't actually wait for any timers to advance
    jest.useFakeTimers();
    setBasketList = jest.fn(); // reset/clear before each test since it's a data store
  });

  test('renders empty basket message when basket is empty', async () => {
    const screen = render(
      <Context.Provider value={{ basketList: [], setBasketList }}>
          <Basket />
      </Context.Provider>
    );
    
    await waitFor(async () => {
      expect(screen.getByText('Your basket is empty')).toBeDefined();
    });     
  });
  

  // test('renders basket items when basket is not empty', async () => {
  //   const screen = render(
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   );
    
  //   await waitFor(async () => {
  //     expect(screen.getByText(`${basketList.length} products`)).toBeDefined();
  //     expect(screen.getByTestId('numeric-input-0')).toBeDefined();
  //     expect(screen.getByTestId('numeric-input-1')).toBeDefined();
  //     expect(screen.getByText('Barcode ID: 1234567890')).toBeDefined();
  //     expect(screen.getByText('Barcode ID: 0987654321')).toBeDefined();
  //     expect(screen.getByTestId('remove-button-0')).toBeDefined();
  //     expect(screen.getByTestId('remove-button-1')).toBeDefined();
  //   })
    
  // });

  // test('NumericInput value can be changed', async () => {
  //   const { getByTestId } = render(
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   );
  
  //   const input = getByTestId('numeric-input-0').findByType('TextInput');
  //   await waitFor(async () => {
  //     fireEvent.changeText(input, '10');
  //     expect(input.props.value).toBe('10');
  //   });
  // });
  

  // test('calls handleQuantityChange when numeric input value is changed', async () => {
  //   const screen = render(
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   );

  //   await waitFor(async () => {
  //     const input = screen.getByTestId('numeric-input-0').findByType('TextInput');
      
  //     fireEvent.changeText(input, '3');
  //     expect(input.props.value).toBe('3');

  //     expect(setBasketList).toHaveBeenCalledWith([
  //       {
  //         data: '1234567890',
  //         type: '512',
  //         quantity: 3,
  //       },
  //       {
  //         data: '0987654321',
  //         type: '32',
  //         quantity: 1,
  //       },
  //     ]);
  //   })
  // });

  // test('calls removeItem when remove button is pressed', async () => {
  //   //const removeItemFunc = jest.fn();

  //   // const removeItem = jest.fn();
  //   // jest.mock('../app/(user)/(customer)/Basket', () => ({ removeItem: removeItem }));
  //   const removeItemMock = jest.spyOn(Basket.prototype, 'removeItem')});

  //   const screen = render(
  //     <Context.Provider value={{ basketList, setBasketList }}>
  //       <Basket /> 
  //     </Context.Provider>
  //   );
  //   //screen.debug();
  //   console.log('context value:', screen.context); // debug output

  //   //console.log('removeItem function:', removeItem); // debug output

  //   await waitFor(async () => {
  //     const button = screen.getByTestId('remove-button-0');
  //     expect(screen.getByTestId('remove-button-0')).toBeTruthy();
  //     //console.log('remove button:', button); // debug output
  //     fireEvent.press(button);
  //     //console.log('removeItem calls:', removeItem.mock.calls);
    
  //     expect(removeItemMock).toBeCalled();
  //     //expect(removeItem).toHaveBeenCalledTimes(1);
  //   });
  // });

  // in this scenario we are testing if what the user should see is correct
  // instead of testing for function call + it's easier to test using user interactions
  // test('removes an item when remove button is pressed', async () => {
    
  //   // create spy for Alert.alert method
  //   const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
  //     const okButton = buttons.find((button) => button.text === 'Ok');
  //     okButton.onPress(); // call the onPress function of the Ok button
  //   });

  //   const screen = render(
  //     <Context.Provider value={{ basketList, setBasketList }}>
  //       <Basket /> 
  //     </Context.Provider>
  //   );

  //   await waitFor(async () => {
  //     // clear all mock data incl. setBasketList (just in case)
  //     jest.clearAllMocks(); // also clears setBasketList since it's called once during rendering

  //     console.log('basketList:', basketList.length);
  //     const button = screen.getByTestId('remove-button-0');
  //     expect(screen.getByTestId('remove-button-0')).toBeTruthy();
  //     fireEvent.press(button);
     
  //     // allows us to assert without writing setBasketList impl.
  //     expect(setBasketList).toHaveBeenCalledWith([{"data": "0987654321", "quantity": 1, "type": "32"}]);

  //     expect(mockAlert).toHaveBeenCalledWith(
  //       'Remove Item',
  //       'Are you sure you want to delete this item?',
  //       expect.any(Array)
  //     );
  //   });

  //   mockAlert.mockRestore();
  // });
  

  // test('shows alert when quantity input is less than 1', async () => {
  //   jest.spyOn(Alert, 'alert');
  //   const screen = render(
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   );

  //   await waitFor(async () => {
  //     // clear all mock data incl. setBasketList (just in case)
  //     jest.clearAllMocks(); // also clears setBasketList since it's called once during rendering

  //     const numericInput = screen.getByTestId('numeric-input-0').findByType('TextInput');
  //     fireEvent.changeText(numericInput, '0');
  //     expect(setBasketList).not.toHaveBeenCalled();
  //     expect(Alert.alert).toHaveBeenCalledWith(
  //       'Enter a valid quantity',
  //       'Quantity must be 1 or more!',
  //       [{ text: 'Ok', style: 'default' }],
  //     );
  //     expect(Alert.alert).toHaveBeenCalledTimes(1);
  //   })

  // });

});
