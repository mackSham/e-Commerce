import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Card } from 'native-base';
import { Avatar } from 'react-native-paper';
const CategoryCard = ({ category, navigation, screenName, openingScreen }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push(screenName, {
          categoryId: category.id, // categoryId or subCategoryId
          categoryName: category.title,
          screenType: openingScreen,
        })
      }
    >
      <Card>
        <ImageBackground style={styles.imageBackgroundContainer} source={{ uri: category.image }}>
          <Text style={styles.textContainer}>{category.title}</Text>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 7,
  },
  textContainer: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default CategoryCard;
