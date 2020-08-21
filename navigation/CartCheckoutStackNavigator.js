import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AppBar from '../components/shared/AppBar';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

export const CartCheckoutStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppBar scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name='Cart' component={CartScreen} options={{ headerTitle: 'Cart' }} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ headerTitle: 'Checkout' }} />
    </Stack.Navigator>
  );
};
