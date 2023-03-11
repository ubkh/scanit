import { expect, jest, test, describe } from "@jest/globals";
import validateForm from "../components/forms-validations/RetailerAddProduct";

describe("Form validation using regex", () => {
  let valuesInput;

  beforeEach(() => {
    valuesInput = {
      name: "",
      description: "not required",
      price: "",
      quantity: "",
      expiry: "",
      barcode: "",
    };
  });

  test("Quantity must not start with 0", () => {
    valuesInput.quantity = "025";
    const returned = validateForm(valuesInput);
    expect(returned.quantity).toBeDefined();
  });

  test("Expiry date must be in the valid format YYYY-MM-DD", () => {
    valuesInput.expiry = "11-11-2011";
    const returned = validateForm(valuesInput);
    expect(returned.expiry).toBeDefined();
  });

  test("Expiry date must be in the past", () => {
    valuesInput.expiry = "2011-11-11";
    const returned = validateForm(valuesInput);
    expect(returned.expiry).toBeDefined();
  });
});
