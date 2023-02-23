import { View } from "react-native";
import { useState, useContext } from "react";
import { Button, Text, Input } from "@rneui/base";
import CurrencyInput from "react-native-currency-input";
import { Formik } from "formik";
import { Context } from "../GlobalContext";
import validateForm from "./forms-validations/storeAddItemValidation";

function StoreAddItemForm(props) {
  // const [values, setValues] = useState(null);
  const globalContext = useContext(Context);
  const { domain } = globalContext;
  const errorStyle = { color: "#c20808" };

  async function submitHandler(values) {
    const jsonObj = JSON.stringify({
      ...values,
      price: Math.ceil(parseFloat(values.price) * 100), // some inputs like "300.09" becomes 30008.9999999 for some reason, hence Math.ceil
      quantity: parseInt(values.quantity),
    });
    await fetch(`http://${domain}/api/store-add-item/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonObj,
    });
  }

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
      onSubmit={(vals) => submitHandler(vals)}
      validate={validateForm}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
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

          <Button
            title={"Add item"}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
}

export default StoreAddItemForm;
