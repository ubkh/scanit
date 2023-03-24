import { useContext } from "react";
import {
  Button,
  Text,
  TextArea,
  Input,
  ScrollView,
  KeyboardAvoidingView,
  FormControl,
  VStack,
} from "native-base";
import { Alert } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../context/GlobalContext";
import { ProductDataContext } from "../context/RetailerProductContext";
import validateForm from "./forms-validations/RetailerProduct";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext.js"

function RetailerProductForm({ isUpdate = false }) {
  const { productData, setProductData } = useContext(ProductDataContext);
  const { domain } = useContext(Context);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: getInitialValues(), mode: "onBlur" });
  const { user } = useAuth();

  function getProductData() {
    return {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      expiry: productData.expiry,
      barcode: productData.barcode,
    };
  }

  function getInitialValues() {
    const vals = {
      name: productData.name ? productData.name : "",
      description: productData.description ? productData.description : "",
      price: productData.price ? (productData.price / 100).toFixed(2) : "0.00",
      quantity: productData.quantity ? productData.quantity.toString() : "",
      expiry: productData.expiry ? productData.expiry : "",
      barcode: productData.barcode ? productData.barcode : "",
    };

    return vals;
  }

  function dataToJSON(values) {
    return JSON.stringify({
      ...values,
      price: Math.ceil(parseFloat(values.price) * 100), // some inputs like "300.09" becomes 30008.9999999 for some reason, hence Math.ceil
      quantity: parseInt(values.quantity),
      store: user.user.employed_at_id,
    });
  }

  async function addSubmitHandler(values) {
    const jsonObj = dataToJSON(values);

    // console.log(jsonObj);

    const res = await fetch(`http://${domain}/api/retailer/add-product/`, {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
      credentials: "include",
    })
    if (res.ok) {
      Alert.alert("Success", "Product was successfully added to the system.");
      router.back();
      setProductData({});
    } else {
      Alert.alert(
        "Failed",
        "Could not add the product to the system. Please try again."
      );
    }
  }

  async function updateSubmitHandler(values) {
    const jsonObj = dataToJSON(values);
    console.log(jsonObj);
    // check if values have not changed
    // properties order is important in JSON comparison
    if (JSON.stringify(getProductData()) === jsonObj) {
      return;
    }
    const res = await fetch(`http://${domain}/api/retailer/update-product/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
      credentials: "include",
    });
    if (res.ok) {
      Alert.alert("Success", "Product was updated successfully.");
      router.back();
      router.replace("/products");
      setProductData({});
    } else {
      Alert.alert(
        "Failed",
        "Could not update the product's data. Please try again."
      );
    }
  }

  const onSubmit = (vals) =>
    isUpdate ? updateSubmitHandler(vals) : addSubmitHandler(vals);

  return (
    <ScrollView
      width="100%"
      flex={1}
      alignSelf="center"
      paddingLeft={10}
      paddingRight={10}
    >
      <Text>&nbsp;</Text>
      {!isUpdate && <Text>Please fill in the details of the product.</Text>}
      <Text>&nbsp;</Text>
      <VStack space={4}>
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label>Name</FormControl.Label>
          <Controller
            control={control}
            name={"name"}
            rules={{ validate: (val) => validateForm.name(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                maxLength={100}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isReadOnly={!isUpdate && productData.name ? true : false}
                isDisabled={!isUpdate && productData.name ? true : false}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.name?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={"description" in errors}>
          <FormControl.Label>Description</FormControl.Label>
          <Controller
            control={control}
            name={"description"}
            rules={{ validate: (val) => validateForm.description(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                maxLength={750}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value.description}
                isReadOnly={!isUpdate && productData.description ? true : false}
                isDisabled={!isUpdate && productData.description ? true : false}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.description?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"price" in errors}>
          <FormControl.Label>Price</FormControl.Label>
          <Controller
            control={control}
            name={"price"}
            rules={{ validate: (val) => validateForm.price(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CurrencyInput
                onChangeValue={(val) => {
                  onChange((val || 0).toFixed(2));
                }}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                separator="."
                delimiter=""
                minValue={0}
                precision={2}
                renderTextInput={(textInputProps) => (
                  <Input
                    {...textInputProps}
                    isReadOnly={!isUpdate && productData.price ? true : false}
                    isDisabled={!isUpdate && productData.price ? true : false}
                  />
                )}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.price?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"quantity" in errors}>
          <FormControl.Label>Quantity</FormControl.Label>
          <Controller
            control={control}
            name={"quantity"}
            rules={{ validate: (val) => validateForm.quantity(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                maxLength={5}
                keyboardType="numeric"
                onChangeText={(val) =>
                  onChange(val.replace(/([^0-9])|(\b0+)/, ""))
                }
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.quantity?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={"expiry" in errors}>
          <FormControl.Label>Expiry</FormControl.Label>
          <Controller
            control={control}
            name={"expiry"}
            rules={{ validate: (val) => validateForm.expiry(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="YYYY-MM-DD"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(val) => onChange(val.replace(/([^0-9-])/, ""))}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.expiry?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"barcode" in errors}>
          <FormControl.Label>Barcode</FormControl.Label>
          <Controller
            control={control}
            name={"barcode"}
            rules={{ validate: (val) => validateForm.barcode(val) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="##############"
                keyboardType="numeric"
                onChangeText={(val) => onChange(val.replace(/([^0-9])/, ""))}
                onBlur={onBlur}
                value={value}
                maxLength={13}
                isReadOnly={productData.barcode ? true : false}
                isDisabled={productData.barcode ? true : false}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.barcode?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          bg="brand.400"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isUpdate ? "Confirm edit" : "Add product"}
        </Button>
        <Text>&nbsp;</Text>
      </VStack>
    </ScrollView>
  );
}

export default RetailerProductForm;
