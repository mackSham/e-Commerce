import 'react-native-gesture-handler';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Container } from 'native-base';
import { AppLoading } from 'expo';
import { useScreens, enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import productReducer from './store/reducers/product';
import categorytReducer from './store/reducers/category';

import { DrawerNavigator } from './navigation/Navigation';

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });
};
const rootReducer = combineReducers({
  product: productReducer,
  category: categorytReducer,
});
const store = createStore(rootReducer);

export default function App() {
  const [fontLoading, setfontLoading] = useState(true);

  if (fontLoading) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setfontLoading(false)} onError={(err) => console.log(err)} />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Container>
          <DrawerNavigator />
        </Container>
      </NavigationContainer>
    </Provider>
  );
}
