import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {} from 'native-base';
import { ProductGridFlatlistItem } from './../components/shared/ProductGridFlatlistItem';
import { toggleCartProduct } from '../store/actions/product';

const WishListScreen = (props) => {
  const wishList = useSelector((state) => state.product.wishListProduct);
  const dispatch = useDispatch();
  const addToCart = useCallback(
    (id) => {
      dispatch(toggleCartProduct(id));
    },
    [dispatch]
  );
  return (
    <View>
      <FlatList
        numColumns={2}
        data={wishList}
        renderItem={(itemData) => ProductGridFlatlistItem(itemData, props.navigation, addToCart)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default WishListScreen;
