import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { Item, Icon, Input } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';

import CategoryCard from './../components/shared/CategoryCard';
import { FlatList } from 'react-native-gesture-handler';
import { ProductGridFlatlistItem } from './../components/shared/ProductGridFlatlistItem';
import { addCartProduct } from '../store/actions/product';

const SearchScreen = (props) => {
  const categories = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.product.products);
  const [screenMode, setScreenMode] = useState('category');
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchReasult] = useState(null);
  const [keyboardState, setKeyboardState] = useState('closed');
  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
  const findProducts = (query) => {
    if (query === '') {
      return [];
    }
    const allProducts = products;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return allProducts.filter((product) => product.title.search(regex) >= 0);
  };
  const searchProducts = () => {
    setKeyboardState('closed');
    if (searchText !== '') {
      setScreenMode('search');
      setSearchReasult(products);
    } else {
      setScreenMode('category');
    }
  };
  let searchedProducts = findProducts(searchText);
  const dispatch = useDispatch();
  const addToCart = useCallback(
    (id) => {
      dispatch(addCartProduct(id));
    },
    [dispatch]
  );
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setKeyboardState('closed');
      }}
    >
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize='none'
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          hideResults={keyboardState === 'open' ? false : true}
          onBlur={() => searchProducts()}
          //data to show in suggestion
          data={searchedProducts.length === 1 && comp(searchText, searchedProducts[0].title) ? [] : searchedProducts}
          //default value if you want to set something in input
          defaultValue={null}
          /*onchange of the text changing the state of the query which will trigger
  the search method to show the suggestions*/
          onChangeText={(text) => {
            setSearchText(text);
            setKeyboardState('open');
          }}
          placeholder='Search Products'
          renderItem={({ item }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={setSearchText(item.title)}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.searchContainer}>
            {screenMode === 'category' ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  navigation={props.navigation}
                  screenName='Products'
                  openingScreen='withSubcategory'
                ></CategoryCard>
              ))
            ) : (
              <FlatList
                numColumns={2}
                data={searchResult}
                renderItem={(itemData) => ProductGridFlatlistItem(itemData, props.navigation, addToCart)}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  autocompleteContainer: {
    borderWidth: 0,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: Dimensions.get('window').width - 20,
    zIndex: 100,
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 60,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default SearchScreen;
