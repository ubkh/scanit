import React from "react";
import { render, screen, within, waitFor } from "test-utils";

import Home from "../app/(user)/(retailer)/home";

jest.mock("expo-router");


// mock library (override any global mocks)
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   useAsyncStorage: jest.fn(),
// }));

// mock whole 'react' library with default values but replace useState with our own mock
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));

describe("Home (example)", () => {

  // run this before each test
  beforeEach(() => {
    // don't actually wait for any timers to advance
    jest.useFakeTimers();
  });

  test("renders correctly", async () => {
    // render
    render(<Home />);
    screen.debug()
    await waitFor(async () => {
      // make assertion  using global 'screen'
      expect(screen.getByText("Home")).toBeDefined();
    });    

  });

  // test("renders correctly again", async () => {
  //   // render and store
  //   const screen = render(<Home />);

  //   await waitFor(async () => {    
  //     const homeHeading = screen.getByText("Home");
  //     const homeText = screen.getByText('You are in the retailer home!');

  //     // make assertions
  //     expect(homeHeading).toBeDefined();
  //     expect(homeText).toBeDefined();
  //   });    

  // });

  
  
});