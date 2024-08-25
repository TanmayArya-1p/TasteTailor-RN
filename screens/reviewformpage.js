import React, { useState } from 'react';
import { View, Text, StyleSheet , ScrollView} from 'react-native';
import { Button , TextInput } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ReviewFormPage({ navigation, route }) {
    const { fID } = route.params; 
    const [ratings, setRatings] = useState({});
    const [rating, setRating] = useState(0);
    const [textRating, setTextRating] = useState("");

  
    const food = {
      foodID: fID,
      name: 'Maggi',
      type: 'savory',
      price: 10,
      serves: 1,
      props: ['spicy', 'sweet'],
      canteen_id: [],
      reviewIDs: [101, 102, 103],
      rating: 3,
      imgUrl: 'https://picsum.photos/700',
    };
  
    const handleRatingChange = (prop, value) => {
      setRatings({ ...ratings, [prop]: value });
    };
  
    const handleSubmit = () => {
      console.log('Submitted Ratings:', ratings);
      navigation.goBack();
    };
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={styles.container} className="display-flex flex-1">
            
            <Text style={styles.title}>Rate {food.name}</Text>
            <View className="flex-row">
                <Text style={styles.info}>Overall Rating: </Text>

                <StarRating
                            rating={rating}
                            onChange={setRating}
                />
            </View>

            <Text style={styles.info}>- Please rate the following properties out of 5</Text>
            

            {food.props.map((prop, index) => (
            <View key={index} className="flex-row" style={styles.inputContainer}>
                <Text style={styles.label} className="mt-2">{prop.charAt(0).toUpperCase() + prop.slice(1)}  </Text>
                <TextInput
                style={styles.input}
                mode="outlined"

                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleRatingChange(prop, parseInt(value))}
                placeholder="0-5"
                />

            </View>
            ))}
            <TextInput
                style={{backgroundColor:"white" , borderColor:"#cb82ff" , borderWidth:1 , borderRadius:7 , width:"100%",marginBottom:20,padding:10}}
                mode="outlined"
                onChangeText={setTextRating}
                value = {textRating}
                multiline={true}
                placeholder="Type Text Review Here(*Optional)">
            </TextInput>
            <Button mode="outlined" onPress={handleSubmit} style={styles.button}>
            <Text style={{color:"black" , fontSize:15}}>Submit</Text>
            </Button>
        </ScrollView>
        </SafeAreaView>

    );
  };
  
  const styles = StyleSheet.create({
    button : {
        color: "white",
        borderWidth:0.5,
        borderRadius:10
        
    },
    container: {
      padding: 20,
      backgroundColor: '#ffffff',
      alignContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color:"black"
    },
    info: {
      fontSize: 19,
      marginBottom: 20,
      color:"black"
    },
    inputContainer: {
      marginBottom: 15,
      color:"black",
      justifyContent: 'center',
    },
    label: {
      fontSize: 20,
      marginBottom: 5,
      color:"black"
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 40,
      fontSize: 16,
      color:"white",
      backgroundColor: "white",
      borderRadius:2,
      borderWidth:0.5,
      borderColor:"#cb82ff",

    },
  });

