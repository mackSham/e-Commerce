import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
const CategoryThumbnail = ({ category, navigation, screenName, openingScreen }) => {
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
      <View style={styles.categoryContainer}>
        <Avatar.Image large source={{ uri: category.image }} />
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {},
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
  promocodeTitle: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  prmocodeSecondaryText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
export default CategoryThumbnail;
