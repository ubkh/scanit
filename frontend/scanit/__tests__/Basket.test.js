import React from 'react';
import { render, waitFor } from "test-utils";
import { Context } from '../context/GlobalContext';
import Basket from '../app/(user)/(customer)/Basket';
import { fireEvent, act } from "@testing-library/react-native";

import NumericInput from 'react-native-numeric-input';

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

  test('renders empty basket message when basket is empty', async () => {
    const screen = render(
      <Context.Provider value={{ basketList: [], setBasketList }}>
          <Basket />
      </Context.Provider>
    );
    
    await waitFor(async () => {
      // make assertion  using global 'screen'
      expect(screen.getByText('Your basket is empty')).toBeDefined();
    });     
  });
  

  test('renders basket items when basket is not empty', async () => {
    const screen = render(
      <Context.Provider value={{ basketList: basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    );
    
    await waitFor(async () => {
      expect(screen.getByText(`${basketList.length} products`)).toBeDefined();
      expect(screen.getByTestId('numeric-input-0')).toBeDefined();
      expect(screen.getByTestId('numeric-input-1')).toBeDefined();
      expect(screen.getByText('Barcode ID: 1234567890')).toBeDefined();
      expect(screen.getByText('Barcode ID: 0987654321')).toBeDefined();
      expect(screen.getByTestId('remove-button-0')).toBeDefined();
      expect(screen.getByTestId('remove-button-1')).toBeDefined();
    })
    
  });

  // test('NumericInput value can be changed', async () => {
  //   const { getByTestId } = render(<NumericInput testID="numeric-input-0" value={5} onChange={console.log("bruh")} />);

  //   const input = getByTestId('numeric-input-0');
  //   await waitFor(async () => {
  //     fireEvent.changeText(input, '10');
  //     expect(input.props.value).toBe(10);
  //   });
  // });

  // test('calls handleQuantityChange when numeric input value is changed', async () => {
  //   const screen = render(
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   );

  //   await waitFor(async () => {
  //     //const numericInput = screen.getByTestId('numeric-input-0');
  //     const numericInput = screen.getByTestId('numeric-input-0').find(
  //       (child) => child.type === NumericInput
  //     );
      
  //     console.debug(numericInput.props.value);
  //     //fireEvent.changeText(numericInput.props.value, '3'); // this doesn't work or maybe we need to rerender
  //     await act(async () => {
  //       await numericInput.props.onChange(3);
  //     });
  //     console.debug(numericInput.props.value);
  //     //fireEvent(numericInput, 'onChange', { value: 5 });
  //     //fireEvent.input(numericInput, { target: { value: '10' } });

  //     expect(numericInput.props.value).toBe(3);

  //     // expect(setBasketList).toHaveBeenCalledWith([
  //     //   {
  //     //     data: '1234567890',
  //     //     type: '512',
  //     //     quantity: 3,
  //     //   },
  //     //   {
  //     //     data: '0987654321',
  //     //     type: '32',
  //     //     quantity: 1,
  //     //   },
  //     // ]);
  //   })
  // });

  test('calls handleQuantityChange when numeric input value is changed', async () => {
    const handleQuantityChange = jest.fn();
    const screen = render(
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    );
  
    const numericInput = screen.getByTestId('numeric-input-0').find(
      (child) => child.type === NumericInput
    );
  
    fireEvent.changeText(numericInput, '3');
  
    await waitFor(() => {
      expect(numericInput.props.value).toBe(3);
    });
  
    screen.update(
      <Context.Provider value={{ basketList, setBasketList }}>
        <Basket />
      </Context.Provider>
    );
  
    expect(handleQuantityChange).toHaveBeenCalledWith(0, 3);
  
    // expect(setBasketList).toHaveBeenCalledWith([
    //   {
    //     data: '1234567890',
    //     type: '512',
    //     quantity: 3,
    //   },
    // ]);
  });
  
  

  // it('calls removeItem when remove button is pressed', async () => {
  //     const removeItem = jest.fn();
  //     const screen = render(
  //       <Context.Provider value={{ basketList: basketList, setBasketList, removeItem}}>
  //         <Basket />
  //       </Context.Provider>
  //     );
      //screen.debug();
      // await waitFor(async () => {
      //   const removeButton = screen.getByTestId('remove-button-0');
      //   fireEvent.press(removeButton);
      //   console.log('removeItem calls', removeItem.mock.calls);
      //   expect(removeItem).toHaveBeenCalledWith(0);

        // const screen = render(
        //   <Context.Provider value={{ basketList, removeItem }}>
        //     <Basket />
        //   </Context.Provider>
        // );
        // screen.debug()
        // const button = screen.getByTestId('remove-button-0')
        // console.log('before button press:', removeItem.mock.calls);
        // fireEvent.press(button);
        // console.log(removeItem.mock.calls)
        // expect(removeItem).toHaveBeenCalledWith(0);
  //       }
  //     )
  //   }
  // );

  // it('shows alert when quantity input is less than 1', async () => {
  //   jest.spyOn(Alert, 'alert');
  //   const screen = render(
  //   <NativeBaseProvider>
  //     <Context.Provider value={{ basketList: basketList, setBasketList }}>
  //       <Basket />
  //     </Context.Provider>
  //   </NativeBaseProvider>,
  //   );
  //   screen.debug();
  //   await waitFor(async () => {
  //     const numericInput = screen.getByTestId('numeric-input-0');
  //     fireEvent.changeText(numericInput, '0');
  //     expect(setBasketList).not.toHaveBeenCalled();
  //     // expect(Alert.alert).toHaveBeenCalledWith(
  //     //   'Enter a valid quantity',
  //     //   'Quantity must be 1 or more!',
  //     //   [{ text: 'Ok', style: 'default' }],
  //     // );
  //     expect(Alert.alert).toHaveBeenCalledTimes(1);
  //     console.log('Alert called');
  //   })

  // });

});
