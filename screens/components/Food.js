
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,Image, ScrollView } from 'react-native';
import { Card , text} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button , Icon , ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRecoilValueLoadable ,useRecoilValue } from 'recoil';
import {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom , serverUrlAtom} from '../atoms'
import {AsyncStorage} from 'react-native';





function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function FoodCard({fID ,food}) {
    // TODO : FETCH IT FROM ACTUAL BACKEND
    navigation = useNavigation()
    // let food = {
    //     foodID : fID,
    //     name: 'Maggi',
    //     type : "savory",
    //     price : 10,
    //     serves: 1,
    //     props : ["spicy" , "sweet"],
    //     canteen_id : [],
    //     reviewIDs : [],
    //     rating: 3,
    //     imgUrl : 'https://picsum.photos/700'
    // }
    return <>
          <Card key={fID} style={styles.foodCard}>
            <Card.Title titleStyle={styles.header} title={`${food.name}, ₹${food.price}`} subtitle={food.description}/>
            <Card.Content style={{alignItems:"center"}}>
                <StarRatingDisplay
                    rating={food.rating}
                    starSize={17}
                    style={{marginBottom:20}}
                />
            </Card.Content>
            <View style={{alignItems:"center" , justifyContent:"center"}}>
            <Card.Cover style = {styles.logo} styles={{alignContent:"center", alignItems:"center"}} source={{ uri: food.imgUrl }} />
            </View>

            <Card.Actions style={{alignContent:"center"}}>
                <Button onPress={()=> {
                    navigation.navigate("FoodReviewPage" , {fID,food})}}>
                <Text style={styles.name1}>Reviews ▶</Text>
                </Button>
            </Card.Actions>
          </Card>
    </>
}


const FoodReviewPage = ({ route }) => {
    const {fID,food } = route.params
    const serverUrl = useRecoilValueLoadable(serverUrlAtom)


    // let food = {
    //     foodID : fID,
    //     name: 'Maggi',
    //     type : "savory",
    //     price : 10,
    //     serves: 1,
    //     props : ["spicy" , "sweet"],
    //     canteen_id : [],
    //     reviewIDs : [],
    //     rating: 3,
    //     imgUrl : 'https://picsum.photos/700'
    // }
    // reviews = [{
    //     id: 1,
    //     reviewer: 'Reviewer 1',
    //     reviewText: 'This is a review for review ID 1.',
    //     rating: 4,
    // },
    // {
    //     id: 1,
    //     reviewer: 'Reviewer 1',
    //     reviewText: 'This is a review for review ID 1.',
    //     rating: 4,
    // },
    // {
    //     id: 1,
    //     reviewer: 'Reviewer 1',
    //     reviewText: 'This is a review for review ID 1.',
    //     rating: 4,
    // },
    // {
    //     id: 1,
    //     reviewer: 'Reviewer 1',
    //     reviewText: 'This is a review for review ID 1.',
    //     rating: 4,
    // }];
    // propertyRatings = [{
    //     name: 'Spicy',
    //     rating: 4,
    // }];

    const [reviews, setReviews] = useState([]);
    const [propertyRatings, setPropertyRatings] = useState({});
    const username = useRecoilValue(userNameAtom)
    const sID = useRecoilValue(sIDAtom)
    console.log("Before food.props" ,food)
    // food.Props.forEach((a)=>{
    //   propertyRatings[a] = 0
    // })

    useEffect(() => {
      async function getReviews() {
        console.log(food)
        console.log("REVIEW GEETTER",serverUrl.contents + `/reviews/items/${food.id}`)
        let res =null
        try{
          res = await axios.get("http://"+serverUrl.contents + `/reviews/items/${food.id}` , {
            headers: {
              'Auth': username+" "+sID
            }
          })
        }
        catch(e){
          console.log("Error getting reviews",e)
        }


        
        console.log("Reviews" , res.data)
        let temp_reviews = []
        res.data.slice(0,5).map((review,index)=> {
          console.log("PROCESSING",review)
          // res.data.CustomParameters.slice(1).foreach((a)=>{
          //   propertyRatings[a] = propertyRatings[a] + res.data.CustomParameters[a]
          // })
          temp_reviews.push({
            id: index,
            reviewer: review.reviewerId.toString(),
            reviewText: review.text,
            rating: review.customParameters.overall,
          })

        })
        setReviews(temp_reviews);
      }
      getReviews()


    },[])

    console.log("REVIEWS TEMP FBHUAWAFUKHAFKHUAFHYJUHJ",reviews)
    
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: food.imgUrl }} style={styles.image} />
  
        {/* Food Details */}
        <View style={styles.detailsContainer}>
            <View className="flex-row justify-between">
                <Text style={styles.name} className="text-black">{food.name} , ₹{food.price}</Text>
                <StarRatingDisplay
                    rating={food.rating}
                    starSize={25}
                    style={{marginBottom:20}}
                />

            </View>
          <Text style={styles.info}> {capitalize(food.type)}, Serves {food.serves} </Text>
          
        </View>
  
        {/* Property Meters */}
        {/* {propertyRatings.map((property, index) => (
          <View key={index} style={styles.propertyContainer}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <ProgressBar
              progress={property.rating / 5}
              color={'#b058fc'}
              style={styles.progressBar}
            />
            <Text style={styles.propertyRating}>{property.rating} / 5</Text>
          </View>
        ))} */}
  
        {/* Reviews Section */}
        <Text style={styles.reviewsTitle}>Recent Reviews</Text>
        {reviews.length > 0 ? (
          reviews.slice(0,4).map((review) => (
            <Card key={review.id} style={styles.reviewCard}>
              <Card.Title titleStyle={{color:"black"}} title={review.reviewer} />
              <Card.Content>
                <StarRatingDisplay
                    rating={review.rating}
                    starSize={20}
                    style={{marginBottom:20}}
                />
                <Text style={{color:"black"}}>{review.reviewText}</Text>

              </Card.Content>
            </Card>
          ))
        ) : (
          <Text></Text>
        )}
        <Card key={"Add Review"} style={styles.addreviewCard} className="">
            <Card.Actions style={{alignContent:"center" , justifyContent:"center"}}>
                <Button style={{width:"100%" , borderWidth:0}} onPress={()=> {
                    navigation.navigate("ReviewFormPage" , {fID,food})}}>
                    <Text style={{color:"black" , fontSize:18}}>📝 Write A Review</Text>
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
        marginBottom: 5,
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
        width: 80,
        height: 80,
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "black"
    },
    name1: {
        fontSize: 12,
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
      height: 250,
      shadowColor: "purple",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      padding:5
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
        backgroundColor : "#ffffff",
        borderColor: "#cd83f2",
        shadowColor: "#ad08ff",
        shadowOpacity: 1,
        borderWidth: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,

      },
      addreviewCard: {
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: "center",
        marginBottom: 40,
        backgroundColor : "#ffffff",
        borderColor: "#cd83f2",
        shadowColor: "#ad08ff",
        shadowOpacity: 1,
        borderWidth: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
      },
      reviewRating: {
        marginTop: 5,
        fontStyle: 'italic',
      },
  });
  
module.exports = {FoodCard , FoodReviewPage}