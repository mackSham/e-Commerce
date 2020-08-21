import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {} from 'native-base';

const CategoriesListScreen = (props) => {
  return (
    <View>
      <Text>CategoriesScreen</Text>
      <Text>{props.route.params.categoryId}</Text>
      <Text>{props.route.params.categoryName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default CategoriesListScreen;
