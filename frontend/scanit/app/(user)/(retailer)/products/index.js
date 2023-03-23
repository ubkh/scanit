import {
  ScrollView,
  Button,
  Heading,
  HStack,
  Spinner,
  Divider,
  Box,
  Text,
  StatusBar,
  useColorMode
} from "native-base";
import BarCodeScanStyle from "../../../../styles/BarCodeScanStyle";
import { useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../../context/GlobalContext";
import ProductListItem from "../../../../components/ProductsListItem";

function Products() {
  const [products, setProducts] = useState([]);
  const [suspendedProducts, setSuspendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuspended, setShowSuspended] = useState(false);
  // const [shouldUpdate, setShouldUpdate] = useState(true);
  const { domain } = useContext(Context);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // useEffect has problem with async function. Create the async function and call it
    (async () => {
      setIsLoading(true);
      const res = await fetch(`http://${domain}/api/retailer/get-products/`, {
        credentials: "include",
      });
      if (res.ok) {
        const productsData = await res.json();
        setProducts(productsData);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, []);

  function handleShowSuspended() {
    setIsLoading(true);
    const susProducts = products.filter((item) => item.is_suspended === true);
    setSuspendedProducts(susProducts);
    setIsLoading(false);
    setShowSuspended(true);
  }

  function getSuspendedProducts() {
    if (suspendedProducts.length) {
      return suspendedProducts.map((item) => (
        <ProductListItem item={item} key={item.id} />
      ));
    } else {
      return <Text textAlign="center" _web={{textAlign: "start"}}>There are no suspended products</Text>;
    }
  }

  // const router = useRouter();
  // const isOnWeb = Platform.OS === "web";

  return (
    <Box
      safeAreaTop
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
      flex={1}
    >
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      
      <Heading size="lg" style={{ fontFamily: "Rubik-Bold" }}
          fontSize={30}
          bold
          justifyContent="flex-start"
          alignSelf={"center"}
          _web={{ mb: "5", mt:"5", mx:"8", alignSelf:"flex-start" }}>
        Products
      </Heading>

      {Platform.OS !== "web" && <Divider
        my="2"
        _light={{
          bg: "muted.200",
        }}
        _dark={{
          bg: "muted.500",
        }}
      />}

      <ScrollView
        width="100%"
        flex={1}
        alignSelf="center"
        _web={{ px: 8 }}
      >
        <HStack alignItems="center" alignSelf="center" _web={{alignSelf: "flex-start"}}>
          <Button
            variant="link"
            px="0"
            size="lg"
            onPress={() => setShowSuspended(false)}
          >
            All products
          </Button>
          <Divider
            h="25"
            bg="brand.400"
            thickness="2"
            mx="2"
            orientation="vertical"
          />
          <Button
            variant="link"
            px="0"
            size="lg"
            onPress={() => handleShowSuspended()}
          >
            Suspended products
          </Button>
        </HStack>
        {isLoading ? (
          <Spinner size="lg" color="blue.400" />
        ) : (
          <Box>
            {showSuspended
              ? getSuspendedProducts()
              : products.map((item) => (
                  <ProductListItem item={item} key={item.id} />
                ))}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

export default Products;
