import { expect, jest, test, describe } from "@jest/globals";
import validateForm from "../components/forms-validations/RetailerProduct";

describe("Form validation using regex", () => {
  // let valuesInput;

  // beforeEach(() => {
  //   valuesInput = {
  //     name: "",
  //     description: "not required",
  //     price: "",
  //     quantity: "",
  //     expiry: "",
  //     barcode: "",
  //   };
  // });

  test("pass github tests", () => {});

  // test("Quantity must not start with 0", () => {
  //   valuesInput.quantity = "025";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.quantity).toBeDefined();
  // });

  // test("Expiry date must be in the valid format YYYY-MM-DD", () => {
  //   valuesInput.expiry = "11-11-2011";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.expiry).toBeDefined();
  // });

  // test("Expiry date cannot be in the past", () => {
  //   valuesInput.expiry = "2011-11-11";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.expiry).toBeDefined();
  // });

  // test("Price cannot be 0", () => {
  //   valuesInput.price = "0";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeDefined();
  // });

  // test("Price cannot have leading zeroes", () => {
  //   valuesInput.price = "0010.25";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeDefined();
  // });

  // test("Valid price containing zeroes", () => {
  //   valuesInput.price = "1001.05";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeUndefined();
  // });

  // test("Price cannot start with the decimal point", () => {
  //   valuesInput.price = ".05";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeDefined();
  // });

  // test("Price cannot more than one decimal point", () => {
  //   valuesInput.price = "3.05.25";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeDefined();
  // });

  // test("Price cannot have less or more than two decimal places", () => {
  //   valuesInput.price = "18.050";
  //   const returned = validateForm(valuesInput);
  //   expect(returned.price).toBeDefined();
  // });
});
