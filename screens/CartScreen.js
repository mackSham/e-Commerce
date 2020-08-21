import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { addCartProduct, removeCartProduct, deleteCartProduct } from './../store/actions/product';

const CartScreen = (props) => {
  const cartProducts = useSelector((state) => state.product.cartProducts);
  const products = useSelector((state) => state.product.products);
  const cartItem = [];
  cartProducts.forEach((cartProduct) => {
    products.forEach((product) => {
      if (product.id === cartProduct.productId) {
        const { id, title, quantity, image, categoryId, price, returnable, productDeliveryTime, offer } = product;
        const { noOfItems, checked } = cartProduct;
        cartItem.push({
          id,
          title,
          quantity,
          image,
          checked,
          price,
          categoryId,
          returnable,
          productDeliveryTime,
          offer,
          noOfItems,
        });
      }
    });
  });
  const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(cartItem);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert(
      'Are you sure you want to delete this item from your cart?',
      '',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteCartProduct(id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const quantityHandler = (action, id) => {
    if (action == 'more') {
      dispatch(addCartProduct(id));
    } else if (action == 'less') {
      dispatch(removeCartProduct(id));
    }
  };
  const subtotalPrice = () => {
    if (cartItem) {
      return cartItem.reduce((sum, item) => sum + item.noOfItems * item.price, 0);
    }
    return 0;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      {cartItemsIsLoading ? (
        <View style={[styles.centerElement, { height: 300 }]}>
          <ActivityIndicator size='large' color='#ef5739' />
        </View>
      ) : (
        <ScrollView>
          {cartItem &&
            cartItem.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120 }}>
                <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('SingleProduct', { productId: item.id });
                    }}
                    style={{ paddingRight: 10 }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee' }]}
                    />
                  </TouchableOpacity>
                  <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 15 }}>
                      {item.title}
                    </Text>
                    <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>
                      {item.color ? 'Variation: ' + item.color : ''}
                    </Text>
                    <Text numberOfLines={1} style={{ color: '#333333', marginBottom: 10 }}>
                      ₹{item.noOfItems * item.price}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => quantityHandler('less', item.id)}
                        style={{ borderWidth: 1, borderColor: '#cccccc' }}
                      >
                        <MaterialIcons name='remove' size={22} color='#cccccc' />
                      </TouchableOpacity>
                      <Text
                        style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#cccccc',
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: '#bbbbbb',
                          fontSize: 13,
                        }}
                      >
                        {item.noOfItems}
                      </Text>
                      <TouchableOpacity
                        onPress={() => quantityHandler('more', item.id)}
                        style={{ borderWidth: 1, borderColor: '#cccccc' }}
                      >
                        <MaterialIcons name='add' size={22} color='#cccccc' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={[styles.centerElement, { width: 60 }]}>
                  <TouchableOpacity
                    style={[styles.centerElement, { width: 32, height: 32 }]}
                    onPress={() => deleteHandler(item.id)}
                  >
                    <Ionicons name='md-trash' size={25} color='#ee4d2d' />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      )}

      {!cartItemsIsLoading && (
        <View style={{ backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.centerElement, { width: 60 }]}>
              <View style={[styles.centerElement, { width: 32, height: 32 }]}>
                <MaterialCommunityIcons name='ticket' size={25} color='#f0ac12' />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>Voucher</Text>
              <View style={{ paddingRight: 20 }}>
                <TextInput
                  style={{ paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4 }}
                  placeholder='Enter voucher code'
                  value={''}
                  onChangeText={(searchKeyword) => {}}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', paddingRight: 20, alignItems: 'center' }}>
                <Text style={{ color: '#8f8f8f' }}>SubTotal: </Text>
                <Text>₹ {subtotalPrice().toFixed(2)}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 32,
              paddingRight: 20,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.centerElement, { backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5 }]}
              onPress={() => console.log('test')}
            >
              <Text style={{ color: '#ffffff' }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerElement: { justifyContent: 'center', alignItems: 'center' },
});
export default CartScreen;
