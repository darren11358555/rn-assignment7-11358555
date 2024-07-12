import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
