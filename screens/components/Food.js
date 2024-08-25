
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,Image, ScrollView } from 'react-native';
import { Card , text} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button , Icon , ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


function FoodCard({fID}) {
    // TODO : FETCH IT FROM ACTUAL BACKEND
    navigation = useNavigation()
    let food = {
        foodID : fID,
        name: 'Maggi',
        type : "savory",
        price : 10,
        serves: 1,
        props : ["spicy" , "sweet"],
        canteen_id : [],
        reviewIDs : [],
        rating: 3,
        imgUrl : 'https://picsum.photos/700'
    }

    return <>
          <Card key={fID} style={styles.foodCard}>
            <Card.Title title={`${food.name}`} subtitle={food.description}/>
            <Card.Content>
                <StarRatingDisplay
                    rating={food.rating}
                    starSize={17}
                />
            </Card.Content>
            <Card.Cover style = {styles.logo}source={{ uri: food.imgUrl }} />
            <Text style={styles.header}>₹{food.price}</Text>
            <Card.Actions>
                <Button onPress={()=> {
                    navigation.navigate("FoodReviewPage" , {fID})}}>
                <Text style={styles.name}>Reviews ▶</Text>
                </Button>
            </Card.Actions>
          </Card>
    </>
}

const fetchReviews = async (reviewIDs) => {
    return reviewIDs.map((id, index) => ({
      id,
      reviewer: `Reviewer ${index + 1}`,
      reviewText: `This is a review for review ID ${id}.`,
      rating: Math.floor(Math.random() * 5) + 1,
    }));
};

const fetchPropertyRatings = async (props) => {
    // Simulate fetching property ratings (e.g., spiciness, sweetness) for each property
    return props.map((prop) => ({
      name: prop,
      rating: Math.floor(Math.random() * 5) + 1, // Random rating for the example
    }));
};  

const FoodReviewPage = ({ route }) => {
    const {fID } = route.params
    let food = {
        foodID : fID,
        name: 'Maggi',
        type : "savory",
        price : 10,
        serves: 1,
        props : ["spicy" , "sweet"],
        canteen_id : [],
        reviewIDs : [],
        rating: 3,
        imgUrl : 'https://picsum.photos/700'
    }
    reviews = [{
        id: 1,
        reviewer: 'Reviewer 1',
        reviewText: 'This is a review for review ID 1.',
        rating: 4,
    },
    {
        id: 1,
        reviewer: 'Reviewer 1',
        reviewText: 'This is a review for review ID 1.',
        rating: 4,
    },
    {
        id: 1,
        reviewer: 'Reviewer 1',
        reviewText: 'This is a review for review ID 1.',
        rating: 4,
    },
    {
        id: 1,
        reviewer: 'Reviewer 1',
        reviewText: 'This is a review for review ID 1.',
        rating: 4,
    }];
    propertyRatings = [{
        name: 'Spicy',
        rating: 4,
    }];
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: food.imgUrl }} style={styles.image} />
  
        {/* Food Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.name} className="text-black">{food.name}</Text>
          <Text style={styles.info}>Type: {food.type}</Text>
          <Text style={styles.info}>Price: ₹{food.price}</Text>
          <Text style={styles.info}>Serves: {food.serves}</Text>
          <Text style={styles.info}>Rating: {food.rating} / 5</Text>
        </View>
  
        {/* Property Meters */}
        <Text style={styles.propertiesTitle}>Properties:</Text>
        {propertyRatings.map((property, index) => (
          <View key={index} style={styles.propertyContainer}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <ProgressBar
              progress={property.rating / 5}
              color={'#6200ee'}
              style={styles.progressBar}
            />
            <Text style={styles.propertyRating}>{property.rating} / 5</Text>
          </View>
        ))}
  
        {/* Reviews Section */}
        <Text style={styles.reviewsTitle}>Recent Reviews:</Text>
        {reviews.length > 0 ? (
          reviews.slice(0,4).map((review) => (
            <Card key={review.id} style={styles.reviewCard}>
              <Card.Title title={review.reviewer} />
              <Card.Content>
                <Text>{review.reviewText}</Text>
                <Text style={styles.reviewRating}>Rating: {review.rating} / 5</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>No reviews available.</Text>
        )}
        <Card key={"Add Review"} style={styles.addreviewCard} className="">
            <Card.Actions>
                <Button onPress={()=> {
                    navigation.navigate("ReviewFormPage" , {fID})}}>
                    <Text style={styles.name}>Write A Review</Text>
                </Button>
            </Card.Actions>
        </Card>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    logo: {
        width: 50,
        height: 50,
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
      fontSize: 13,
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
      borderRadius: 1,
      alignContent: 'center',
      height: 200
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
      propertiesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
      },
      propertyContainer: {
        marginBottom: 10,
      },
      propertyName: {
        fontSize: 16,
        marginBottom: 5,
        color: "black"
      },
      progressBar: {
        height: 10,
        borderRadius: 5,
      },
      propertyRating: {
        fontSize: 14,
        marginTop: 5,
        fontStyle: 'italic',
        color: "black"
      },
      reviewsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: "black"
      },
      reviewCard: {
        marginBottom: 10,
        justifyContent: 'center',

      },
      addreviewCard: {
        marginBottom: 10,
        alignContent: 'center',
        marginBottom: 40,
      },
      reviewRating: {
        marginTop: 5,
        fontStyle: 'italic',
      },
  });
  
module.exports = {FoodCard , FoodReviewPage}