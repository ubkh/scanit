validateForm = {
  name: (value) => {
    if (!value) {
      return "Required";
    } else if (value.length > 100) {
      return "Must be 100 characters or less";
    }
    return true;
  },

  description: (value) => {
    if (value.length > 750) {
      return "Must be 750 characters or less";
    }
    return true;
  },

  price: (value) => {
    if (!value || value === "0.00") {
      return "Required";
    } else if (!/^(([1-9]+0*)+|0{1})\.{1}[0-9]{2}$/.test(value)) {
      return "Invalid price";
    }
    return true;
  },

  quantity: (value) => {
    if (!value) {
      return "Required";
    } else if (/\b0+/.test(value)) {
      return "Invalid quantity";
    }
    return true;
  },

  expiry: (value) => {
    if (!value) {
      return "Required";
    } else if (
      !/((?:20|21)[0-9][0-9])\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/.test(
        value
      )
    ) {
      return "Invalid expiry date";
    } else if (new Date(value) < new Date()) {
      return "Expiry date cannot be in the past";
    }
    return true;
  },

  barcode: (value) => {
    if (!value) {
      return "Required";
    } else if (value.length > 13) {
      return "Must be 13 or less";
    }
    return true;
  },
};

export default validateForm;
