import React, {useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet , Linking } from 'react-native';
import { Card , Button, Icon} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Searchbar,ActivityIndicator } from 'react-native-paper';
import {FoodCard} from './components/Food';
import { useRecoilValue ,useRecoilValueLoadable} from 'recoil';
import {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom , serverUrlAtom} from "./atoms"
import axios from 'axios';


function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CanteenView({route}) {
    let {canteen} = route.params
    let [foodFilter , setFoodFilter] = useState("")
    const [loading, setLoading] = useState(true)
    const [canteenFoodItems, setCanteenFoodItems] = useState([])
    const serverUrl = useRecoilValueLoadable(serverUrlAtom)

    const username = useRecoilValue(userNameAtom)
    const sID = useRecoilValue(sIDAtom)

    React.useEffect(() => {

      async function getItems() {
        console.log("HEREHEHEHEHEHR", canteen)
        let temp = []

      

        for (let i = 0; i < canteen.food_items.length; i++) { 
          console.log(serverUrl.contents+`/items/${canteen.food_items[i]}`)
          let res = null
          try {
            console.log("ITEMID FOOD",canteen.food_items[i])
            res = await axios.get("http://"+serverUrl.contents+`/items/${canteen.food_items[i]}` , {
              headers: {
                'Auth': username+" "+sID
              }
            })
            console.log("REQUESTS DONE")
          }
          catch (error) {
            console.error(error);

          }

          console.log("CANTEEN ITEMS RESP ",res.data)
          temp.push(res.data)
        }


        setLoading(false)
        setCanteenFoodItems(temp)
      }
      getItems()
    }, [canteen])
  return (
    <View style={styles.container} className="flex-1">
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

      </View>
      <Searchbar
        placeholder='Search Food Items...'
        onChangeText={setFoodFilter}
        value= {foodFilter}
        mode="bar"
        className="mb-5"
        style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" ,marginBottom:10 , borderWidth : 0.2 , borderColor:"#ad08ff" , borderRadius:10 , height:60}}
      ></Searchbar>
      {loading? <ActivityIndicator size="large" className="mt-20" style={{alignSelf:"center"}}></ActivityIndicator> : true}
      <ScrollView horizontal style={styles.scrollView} className="content-center">
        {canteenFoodItems.map((item, index) => {
          console.log("item",item.name + " "+foodFilter)
          if(item.name.toLowerCase().includes(foodFilter.toLowerCase())){
            return(<FoodCard fID={index} food={item}></FoodCard>)
          }
          return <></>
        })}
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
    marginBottom: 20
  },
  foodCard: {
    width: 150,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 1
  },
});

