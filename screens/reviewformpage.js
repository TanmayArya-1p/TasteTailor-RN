import React, { useState } from 'react';
import { View, Text, StyleSheet , ScrollView} from 'react-native';
import { Button , TextInput } from 'react-native-paper';


export default function ReviewFormPage({ navigation, route }) {
    const { fID } = route.params; // Assuming fID is passed as a route param
    const [ratings, setRatings] = useState({});
  
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rate {food.name}</Text>
        <Text style={styles.info}>Please rate the following properties out of 5:</Text>
  
        {food.props.map((prop, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{prop.charAt(0).toUpperCase() + prop.slice(1)}:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleRatingChange(prop, parseInt(value))}
              placeholder="0-5"
            />
          </View>
        ))}
  
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    info: {
      fontSize: 16,
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
    },
  });

