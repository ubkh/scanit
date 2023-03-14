import { useContext } from "react";
import {
  Button,
  Text,
  TextArea,
  KeyboardAvoidingView,
  Input,
  ScrollView,
  FormControl,
  VStack,
} from "native-base";
import CurrencyInput from "react-native-currency-input";
import { Formik } from "formik";
import { Context } from "../context/GlobalContext";
import validateForm from "./forms-validations/RetailerAddProduct";
import { useSearchParams } from "expo-router";

function RetailerAddProductForm() {
  const params = useSearchParams();
  const { productData } = params || {};
  const globalContext = useContext(Context);
  const { domain } = globalContext;
  // const errorStyle = { color: "#c20808" };

  // if product was not found in the db then productData has only the barcode. This prevents price from becoming a NaN
  function getProductPrice() {
    return productData.price ? (productData.price / 100).toString() : "0";
  }

  function getInitialValues() {
    const vals = {
      name: "",
      description: "",
      price: "0",
      quantity: "",
      expiry: "",
      barcode: "",
    };
    if (productData) {
      return {
        ...vals,
        ...productData,
        price: getProductPrice(),
      };
    }
    return vals;
  }

  async function submitHandler(values) {
    const jsonObj = JSON.stringify({
      ...values,
      price: Math.ceil(parseFloat(values.price) * 100), // some inputs like "300.09" becomes 30008.9999999 for some reason, hence Math.ceil
      quantity: parseInt(values.quantity),
    });
    await fetch(`http://${domain}/api/store-add-product/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonObj,
    });
  }

  return (
    <Formik
      initialValues={getInitialValues()}
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
        <ScrollView width="100%" flex={1} alignSelf="center" paddingLeft={10} paddingRight={10}>
          <Text>&nbsp;</Text>
          <Text>Please fill in the details of the product.</Text>
          <Text>&nbsp;</Text>
          <VStack space={4}>
            <FormControl isRequired isInvalid={"name" in errors && touched.name}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                maxLength={100}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <FormControl.ErrorMessage>
                {touched.name && errors.name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"description" in errors && touched.description}>
              <FormControl.Label>Description</FormControl.Label>
              <TextArea
                maxLength={750}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              <FormControl.ErrorMessage>
                {touched.description && errors.description}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"price" in errors && touched.price}>
              <FormControl.Label>Price</FormControl.Label>
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
                  <Input {...textInputProps} />
                )}
              />
              <FormControl.ErrorMessage>
                {touched.price && errors.price}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"quantity" in errors && touched.quantity}>
              <FormControl.Label>Quantity</FormControl.Label>
              <Input
                maxLength={5}
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleChange("quantity")(text.replace(/([^0-9])|(\b0+)/g, ""))
                }
                onBlur={handleBlur("quantity")}
                value={values.quantity}
              />
              <FormControl.ErrorMessage>
                {touched.quantity && errors.quantity}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"expiry" in errors && touched.expiry}>
              <FormControl.Label>Expiry</FormControl.Label>
              <Input
                placeholder="YYYY-MM-DD"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(val) =>
                  handleChange("expiry")(val.replace(/([^0-9-])/g, ""))
                }
                onBlur={handleBlur("expiry")}
                value={values.expiry}
              />
              <FormControl.ErrorMessage>
                {touched.expiry && errors.expiry}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"barcode" in errors && touched.barcode}>
              <FormControl.Label>Barcode</FormControl.Label>
              <Input
                placeholder="##############"
                keyboardType="numeric"
                onChangeText={(val) =>
                  handleChange("barcode")(val.replace(/([^0-9])/g, ""))
                }
                onBlur={handleBlur("barcode")}
                value={values.barcode}
                maxLength={13}
              />
              <FormControl.ErrorMessage>
                {touched.barcode && errors.barcode}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* <Input
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
          /> */}

            <Button
              bg="brand.400"
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              Add product
            </Button>
            <Text>&nbsp;</Text>
          </VStack>
        </ScrollView>
      )}
    </Formik>
  );
}

export default RetailerAddProductForm;
