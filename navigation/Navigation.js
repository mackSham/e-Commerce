import React from 'react';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Text } from 'native-base';
import { Icon } from 'native-base';

import AppBar from '../components/shared/AppBar';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import MainScreen from '../screens/MainScreen';
import CategoriesListScreen from '../screens/CategoriesListScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import WishListScreen from '../screens/WishListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) === 'Home' || getFocusedRouteNameFromRoute(route) === undefined
    ? 'Easy Picker'
    : getFocusedRouteNameFromRoute(route);
}
function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name='home-outline' type='MaterialCommunityIcons' style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => <Icon name='search' size={size} style={{ color: color }} />,
        }}
      />
      <Tab.Screen
        name='Wishlist'
        component={WishListScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Icon name='heart-o' type='FontAwesome' style={{ fontSize: 24, color: color }} />
          ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Icon name='user' type='AntDesign' size={size} style={{ color: color }} />,
        }}
      />
    </Tab.Navigator>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='TabNavigator'
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppBar scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name='CategoryList'
        component={CategoriesListScreen}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
      <Stack.Screen
        name='Products'
        component={ProductsScreen}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
      <Stack.Screen name='SingleProduct' component={SingleProductScreen} options={({ route }) => ({ title: '' })} />
      <Stack.Screen name='Cart' component={CartScreen} options={{ headerTitle: 'Cart' }} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ headerTitle: 'Checkout' }} />
    </Stack.Navigator>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name='HomeStackNavigator' component={StackNavigator} />
    </Drawer.Navigator>
  );
};
