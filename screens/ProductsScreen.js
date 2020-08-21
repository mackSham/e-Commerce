import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Thumbnail, Icon } from 'native-base';
import StarRating from 'react-native-star-rating';

import CategoryThumbnail from './../components/shared/CategoryThumbnail';
import { useSelector, useDispatch } from 'react-redux';
import { ProductGridFlatlistItem } from './../components/shared/ProductGridFlatlistItem';
import { addCartProduct } from './../store/actions/product';

const SubCategoryScrollView = ({ navigation, subcategoryId }) => {
  const subCategory = useSelector((state) => state.category.subCategory);
  return subCategory.map((category) => (
    <CategoryThumbnail
      key={category.id}
      category={category}
      navigation={navigation}
      screenName='Products'
      screenType='nonSubcategory'
    />
  ));
};
const ProductsScreen = (props) => {
  const dispatch = useDispatch();
  const addToCart = useCallback(
    (id) => {
      dispatch(addCartProduct(id));
    },
    [dispatch]
  );
  const getFilteredProduct = () => {
    const products = useSelector((state) => state.product.products);
    if (props.route.params.screenType === 'withSubcategory') {
      return products.filter((p) => p.categoryId === props.route.params.categoryId);
    } else {
      return products.filter((p) => p.subCategoryId === props.route.params.categoryId);
    }
  };
  const [filteredProduct, setFilteredProducts] = useState(getFilteredProduct());
  // console.log(filteredProduct);
  return (
    <View>
      <View>
        {props.route.params.screenType === 'withSubcategory' ? (
          <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              <SubCategoryScrollView navigation={props.navigation} subcategoryId={props.route.params.categoryId} />
            </ScrollView>
          </View>
        ) : null}
      </View>

      <View>
        <FlatList
          numColumns={2}
          data={filteredProduct}
          renderItem={(itemData) => ProductGridFlatlistItem(itemData, props.navigation, addToCart)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    width: Dimensions.get('screen').width / 4.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryImage: {
    padding: 10,
    alignItems: 'center',
  },
  categoryTitle: {
    marginTop: 6,
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
  },
  promocodeContainer: {
    width: '100%',
    height: '50%',
    padding: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
export default ProductsScreen;
