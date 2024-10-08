
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image } from 'react-native';
import { Card , text} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
let canteen_data = require("../canteens.json")

function CanteenCard({canteenID}) {
    // TODO : FETCH IT FROM ACTUAL BACKEND
    navigation = useNavigation()
    let canteen = canteen_data[canteenID]

    return <>
        <Card key={canteenID} className ="mt-50" style={styles.canteenCardContent}>
            <Card.Title titleStyle={{color:"black"}} subtitleStyle={{color:"black"}} title={canteen.name} titleVariant='bodyLarge' subtitle={`Open from ${canteen.openingHours}`}/>

            <Card.Content>
                {/* TODO : UPLOAD IMAGES TO BLOB */}
                <Card.Cover style={{marginTop:10}} source={{ uri: canteen.imgUrl}} />
            </Card.Content>
            <Card.Actions classname="mt-5" style={{marginTop:10}}>
                <Button mode="elevated" style={{borderRadius:5 ,backgroundColor: "white" ,  shadowColor:"#ad08ff" , shadowOpacity:1 , borderWidth:0.2}} onPress={() => navigation.navigate("CanteenView" , {canteen})}>
                    <Text style={{fontSize:17 , color:"#8a8787" }}> Explore ▶</Text>
                </Button>
            </Card.Actions>
        </Card>
    </>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    welcome: {
      fontSize: 24,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    canteenCard: {
      marginBottom: 10,
      backgroundColor: '#f1f1f1',

    },
    canteenCardContent : {
        marginBottom: 10,
        backgroundColor : "#ffffff",
        borderColor: "#cd83f2",
        shadowColor: "#ad08ff",
        shadowOpacity: 1,
        borderWidth: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,

    },
    logo: {
        width: 66,
        height: 58,
      },
  });
export default CanteenCard