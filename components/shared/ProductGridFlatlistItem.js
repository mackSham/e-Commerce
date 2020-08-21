import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import StarRating from 'react-native-star-rating';

import { TOGGLE_CART_PRODUCT } from './../../store/actions/product';

export const ProductGridFlatlistItem = (itemData, navigation, addToCart) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('SingleProduct', {
          productId: itemData.item.id,
        })
      }
    >
      <View style={styles.gridContainer}>
        <ImageBackground style={styles.gridImage} source={{ uri: itemData.item.image }}>
          <Icon name='heart' style={styles.wish} />
        </ImageBackground>
        <Text style={styles.gridTitle}>{itemData.item.title}</Text>
        <Text style={styles.gridPrice}>{itemData.item.price}</Text>
        <TouchableOpacity
          onPress={() => {
            addToCart(itemData.item.id);
          }}
        >
          <Icon type='FontAwesome' name='plus-square' style={styles.cart} />
        </TouchableOpacity>
        <StarRating disabled={false} maxStars={5} rating={itemData.item.review} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  gridContainer: {
    width: Dimensions.get('window').width / 2,
    padding: 10,
    flex: 1,
  },
  gridImage: {
    height: 180,
  },
  gridTitle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  gridPrice: {
    fontSize: 14,
  },
});
// export default ProductGridFlatlistItem;
