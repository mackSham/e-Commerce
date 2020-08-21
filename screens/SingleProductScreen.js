import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { PRODUCT } from './../data/dummyData';
import { Icon, Button } from 'native-base';

const SingleProductScreen = (props) => {
  const { id, title, image, categoryId, subCategoryId, price, offer, review } = PRODUCT.filter(
    (p) => p.id === props.route.params.productId
  )[0];
  return (
    <View>
      <ImageBackground style={styles.gridImage} source={{ uri: image }}>
        <Icon name='heart' style={styles.wish} />
        <Icon type='FontAwesome' name='plus-square' style={styles.cart} />
      </ImageBackground>
      <View>
        <Text style={styles.gridTitle}>{title}</Text>
        <Text style={styles.gridPrice}>{price}</Text>
        <Button primary>
          <Text>Add to Cart</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridImage: {
    height: 300,
  },
  gridTitle: {
    fontSize: 28,
    color: '#AAAAAA',
    fontWeight: '300',
  },
  gridPrice: {
    fontSize: 14,
  },
});
export default SingleProductScreen;
