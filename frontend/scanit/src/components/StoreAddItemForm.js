import { View } from "react-native";
import { useState } from "react";
import { Button, Text, Input } from "@rneui/base";
import CurrencyInput from "react-native-currency-input";
import { Formik } from "formik";

function StoreAddItemForm(props) {
  // const [values, setValues] = useState(null);

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 100) {
      errors.name = "Must be 100 characters or less";
    }

    if (!values.description) {
      errors.description = "Required";
    } else if (values.description.length > 750) {
      errors.description = "Must be 750 characters or less";
    }

    if (!values.price) {
      errors.price = "Required";
    } else if (!/^[0-9.]+/i.test(values.price)) {
      errors.price = "Invalid price";
    }

    if (!values.quantity) {
      errors.quantity = "Required";
    } else if (!/^[0-9]+/i.test(values.quantity)) {
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
    } else if (!/[0-9]+/i.test(values.barcode)) {
      errors.barcode = "Invalid barcode number";
    }

    return errors;
  };

  const errorStyle = { color: "#c20808" };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "0",
        quantity: "",
        expiry: "",
        barcode: "",
      }}
      onSubmit={(vals) => console.log(vals)}
      validate={validateForm}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <Text>Please fill in the details of the item.</Text>
          <Input
            label="Name"
            maxLength={100}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            errorStyle={errorStyle}
            errorMessage={errors.name && touched.name ? errors.name : ""}
          />

          <Input
            label="Description"
            multiline
            maxLength={750}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            errorStyle={errorStyle}
            errorMessage={
              errors.description && touched.description
                ? errors.description
                : ""
            }
          />

          <CurrencyInput
            label="Price"
            onChangeValue={(val) => {
              handleChange("price")((val || 0).toString());
            }}
            onBlur={handleBlur("price")}
            value={values.price}
            keyboardType="numeric"
            separator="."
            delimiter=""
            minValue={0}
            precision={2}
            renderTextInput={(textInputProps) => (
              <Input {...textInputProps} variant="filled" />
            )}
            errorStyle={errorStyle}
            errorMessage={errors.price && touched.price ? errors.price : ""}
          />

          <Input
            label="Quantity"
            maxLength={5}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleChange("quantity")(text.replace(/([^0-9])|(\b0+)/g, ""))
            }
            onBlur={handleBlur("quantity")}
            value={values.quantity}
            errorStyle={errorStyle}
            errorMessage={
              errors.quantity && touched.quantity ? errors.quantity : ""
            }
          />

          <Input
            label="Expiry"
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(val) =>
              handleChange("expiry")(val.replace(/([^0-9-])/g, ""))
            }
            onBlur={handleBlur("expiry")}
            value={values.expiry}
            errorStyle={errorStyle}
            errorMessage={errors.expiry && touched.expiry ? errors.expiry : ""}
          />

          <Input
            label="Barcode"
            placeholder="##############"
            keyboardType="numeric"
            onChangeText={(val) =>
              handleChange("barcode")(val.replace(/([^0-9])/g, ""))
            }
            onBlur={handleBlur("barcode")}
            value={values.barcode}
            errorStyle={errorStyle}
            errorMessage={
              errors.barcode && touched.barcode ? errors.barcode : ""
            }
            maxLength={13}
          />

          <Button title={"Add item"} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

export default StoreAddItemForm;
