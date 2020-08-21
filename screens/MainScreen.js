import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Thumbnail, Card, Content, H2 } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import CategoryThumbnail from './../components/shared/CategoryThumbnail';

const MainPageCategory = ({ navigation }) => {
  const categories = useSelector((state) => state.category.category);
  return categories.map((category) => (
    <CategoryThumbnail
      key={category.id}
      category={category}
      navigation={navigation}
      screenName='Products'
      openingScreen='withSubcategory'
    />
  ));
};
const MainScreen = (props) => {
  return (
    <View>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <MainPageCategory navigation={props.navigation} />
        </ScrollView>
      </View>

      <View style={styles.promocodeContainer}>
        <ImageBackground
          source={{ uri: 'https://source.unsplash.com/weekly?gradient' }}
          imageStyle={{ borderRadius: 6 }}
          style={styles.image}
        >
          <Text style={styles.promocodeTitle}>20% OFF on Everything</Text>
          <Text style={styles.prmocodeSecondaryText}>USE CODE: EASYPICKER</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default MainScreen;
