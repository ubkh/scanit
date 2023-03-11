const validateForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 100) {
    errors.name = "Must be 100 characters or less";
  }

  if (values.description.length > 750) {
    errors.description = "Must be 750 characters or less";
  }

  if (!values.price) {
    errors.price = "Required";
  } else if (!/^[0-9.]+/i.test(values.price) || values.price === "0") {
    errors.price = "Invalid price";
  }

  if (!values.quantity) {
    errors.quantity = "Required";
  } else if (/\b0+/i.test(values.quantity)) {
    errors.quantity = "Invalid quantity";
  }

  if (!values.expiry) {
    errors.expiry = "Required";
  } else if (
    !/((?:20|21)[0-9][0-9])\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/i.test(
      values.expiry
    )
  ) {
    errors.expiry = "Invalid expiry date";
  } else if (new Date(values.expiry) < new Date()) {
    errors.expiry = "Expiry date cannot be in the past";
  }

  if (!values.barcode) {
    errors.barcode = "Required";
  } else if (values.barcode.length > 13) {
    errors.barcode = "Must be 13 or less";
  }

  return errors;
};

export default validateForm;
