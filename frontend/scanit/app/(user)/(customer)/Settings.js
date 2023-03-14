import { useContext } from 'react';
import { Text, View, Heading, Flex, StatusBar, Divider, Spacer, Box, Badge, useColorMode } from 'native-base';
import ThemeButton from '../../../components/ThemeButton';
import { Context } from '../../../context/GlobalContext';
import LogOutButton from '../../../components/LogOutButtonComponent';

const version = require("../../../package.json").version;

function Settings(props) {
    const globalContext = useContext(Context);
    const { colorMode } = useColorMode();

    return (
      <View style={{flex: 1}} _dark={{bg: "black"}} _light={{bg: "white"}}>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} animated={true}/>
      <Flex alignItems="center" safeAreaTop>
          <Heading size="lg" fontSize={30} bold justifyContent="flex-start" style={{ fontFamily: 'Rubik-Bold' }}>Settings</Heading>
          <Divider my="2" _light={{
              bg: "muted.200"
          }} _dark={{
              bg: "muted.500"
          }} />          
          <Box borderWidth={1} borderColor="gray.200" width={"90%"} borderRadius={8} p={4} marginTop={3}>
            <Box mb={2}>
              <Text bold fontSize={16}>Appearance</Text>
            </Box>
            <Divider my="2" borderColor="gray.200" />
            <Box mt={2} flexDirection="row" justifyContent={"space-between"}>
              <Text>Change theme:</Text>
              <ThemeButton />
            </Box>
          </Box>
          <Box borderWidth={1} borderColor="gray.200" width={"90%"} borderRadius={8} p={4} marginTop={4}>
            <Box mb={2}>
              <Text bold fontSize={16}>App info</Text>
            </Box>
            <Divider my="2" borderColor="gray.200" />
            <Box mt={2} flexDirection="row" justifyContent={"space-between"}>
              <Text>Version:</Text>
              <Text>{version}</Text>
            </Box>
            <Box mt={2} flexDirection="row" justifyContent={"space-between"}>
              <Text>Build type:</Text>
              {process.env.NODE_ENV === 'development' ? 
              <Badge colorScheme="warning" rounded="md">dev</Badge> : <Badge colorScheme="success" rounded="md">prod</Badge>}
            </Box>
            <Box mt={2} flexDirection="row" justifyContent={"space-between"}>
              <Text>Authors:</Text>
              <Text>Pubjee Mobail</Text>
            </Box>
          </Box>
          <Text>&nbsp;</Text>
          {Platform.OS !== 'web' && <LogOutButton />}
      </Flex>
      </View>  
    );
}

  
export default Settings;