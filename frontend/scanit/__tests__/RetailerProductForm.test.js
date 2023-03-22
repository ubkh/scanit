import { expect, test, describe } from "@jest/globals";
import validateForm from "../components/forms-validations/RetailerProduct";

describe("Form validation using regex", () => {
  // the validationForm method either returns true
  // if value is valid or the error message in a string

  test("Quantity must not start with 0", () => {
    value = "025";
    const returned = validateForm.quantity(value);
    expect(typeof returned).toBe("string");
  });

  test("Expiry date must be in the valid format YYYY-MM-DD", () => {
    value = "11-11-2011";
    const returned = validateForm.expiry(value);
    expect(typeof returned).toBe("string");
  });

  test("Expiry date cannot be in the past", () => {
    value = "2011-11-11";
    const returned = validateForm.expiry(value);
    expect(typeof returned).toBe("string");
  });

  test("Price cannot be 0", () => {
    value = "0";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("string");
  });

  test("Price cannot have leading zeroes", () => {
    value = "0010.25";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("string");
  });

  test("Valid price containing zeroes", () => {
    value = "1001.05";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("boolean");
  });

  test("Price cannot start with the decimal point", () => {
    value = ".05";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("string");
  });

  test("Price cannot more than one decimal point", () => {
    value = "3.05.25";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("string");
  });

  test("Price cannot have less or more than two decimal places", () => {
    value = "18.050";
    const returned = validateForm.price(value);
    expect(typeof returned).toBe("string");
  });
});
