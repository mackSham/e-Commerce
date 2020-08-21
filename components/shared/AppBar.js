import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Header, Left, Button, Icon, Body, Right, Title, Badge, Content } from 'native-base';
import { useSelector } from 'react-redux';
const AppBar = ({ scene, previous, navigation }) => {
  const cartProductsCount = useSelector((state) => state.product.cartProducts).length;
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <React.Fragment>
      <Header>
        <Left>
          {previous ? (
            <Button transparent onPress={() => navigation.pop()}>
              <Icon name='ios-arrow-back' />
            </Button>
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </TouchableOpacity>
          )}
        </Left>
        <Body>
          <Title>{title === 'Main' ? 'Easy Picker' : title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Cart')}>
            <Icon name='cart' />
            <Badge style={styles.shoppingBadge}>
              <Text>{cartProductsCount}</Text>
            </Badge>
          </Button>
        </Right>
      </Header>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  shoppingBadge: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
    color: '#000000',
  },
});
export default AppBar;
