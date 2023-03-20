import {
  ScrollView,
  Button,
  Heading,
  HStack,
  View,
  Spinner,
  Divider,
  Box,
} from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";
import { useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../../context/GlobalContext";
import ProductListItem from "../../../../components/ProductsListItem";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const globalContext = useContext(Context);
  const { domain } = globalContext;

  useEffect(() => {
    // useEffect has problem with async function. Create the async function and call it
    (async () => {
      setIsLoading(true);
      const res = await fetch(`http://${domain}/api/retailer/get-products/`, {
        credentials: "include",
      });
      const productsData = await res.json();
      setProducts(productsData);
      setIsLoading(false);
    })();
  }, []);

  const router = useRouter();
  // const isOnWeb = Platform.OS === "web";

  return (
    <View
      style={BarCodeScanStyle.container}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      <ScrollView
        width="100%"
        flex={1}
        alignSelf="center"
        paddingLeft={10}
        paddingRight={10}
      >
        <Heading size="lg" mb="7">
          Products
        </Heading>
        <HStack alignItems="center">
          <Button variant="link" px="0" size="lg">
            All products
          </Button>
          <Divider
            h="25"
            bg="emerald.500"
            thickness="2"
            mx="2"
            orientation="vertical"
          />
          <Button variant="link" px="0" size="lg">
            Suspended products
          </Button>
        </HStack>
        {isLoading ? (
          <Spinner size="lg" color="blue.400" />
        ) : (
          <Box>
            {products.map((item) => (
              <ProductListItem item={item} key={item.id} />
            ))}
          </Box>
        )}
      </ScrollView>
    </View>
  );
}

export default Products;
