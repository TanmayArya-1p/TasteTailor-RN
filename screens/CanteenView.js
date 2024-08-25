import React, {useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet , Linking } from 'react-native';
import { Card , Button, Icon} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Searchbar } from 'react-native-paper';
import {FoodCard} from './components/Food';

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CanteenView({route}) {
    let {canteen} = route.params
    let {foodFilter , setFoodFilter} = useState("")
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{canteen.name}</Text>
      <Image source={{ uri: canteen.imgUrl }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <View className="flex-row justify-between">
          <Text style={styles.info}>{capitalize(canteen.type)} Canteen</Text>
          <Button icon="google-maps" style={{borderWidth:0.3 , borderColor:"black"}} onPress={() => Linking.openURL(`google.navigation:q=${canteen.lat}+${canteen.long}`)}>
            Maps
          </Button>
        </View>

        <Text style={styles.info}>Opening Hours: {capitalize(canteen.openingHours)}</Text>
        <StarRatingDisplay
                    rating={canteen.rating}
                    starSize={20}
                />
      </View>
      <Searchbar
        placeholder='Search Food Items...'
        onChangeText={setFoodFilter}
        value= {foodFilter}
        mode="bar"
        className="mb-5"
        style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" ,marginBottom:10 , borderWidth : 0.2 , borderColor:"#ad08ff" , borderRadius:10 , height:60}}
      ></Searchbar>
      <ScrollView horizontal style={styles.scrollView}>
        {canteen.food_items.map((item, index) => (
            <FoodCard fID={index}></FoodCard>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black"
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "black"
  },
  foodItemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black"
  },
  scrollView: {
    marginBottom: 20,
  },
  foodCard: {
    width: 150,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 1
  },
});

