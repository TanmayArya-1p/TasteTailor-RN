
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,Image, ScrollView } from 'react-native';
import { Card , text} from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button , Icon , ProgressBar , Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRecoilValueLoadable ,useRecoilValue } from 'recoil';
import {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom , serverUrlAtom} from './atoms'
import {AsyncStorage} from 'react-native';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}


function FoodHorizontalCard({food}) {
    console.log("FOOD HORIZONTAL CARD GENERATOR" , food.name)
    let navigation = useNavigation()
    return (<Card style={styles.card}>
          <Card.Content>
            <View className="flex-row justify-between">
            <Text style={{color:"black" , fontSize:22}}>{capitalize(food.name)}</Text>
            <StarRatingDisplay rating={food.rating} starSize={18}></StarRatingDisplay>

            </View>
            
            <Text style={{color:"black", fontSize:20}}>₹{food.price}</Text>
            <View className="flex-row justify-between">
                <Text style={{color:"black"}}>{capitalize(food.type)} </Text>
                <Button icon={"call-made"} onPress={()=>navigation.navigate("FoodReviewPage" , {fid: food.id , food:food})}>Go To Item</Button>

            </View>


            </Card.Content>
        </Card>)

}

export default function ItemsQuery({ route }) {
    const username = useRecoilValue(userNameAtom)
    const sID = useRecoilValue(sIDAtom)
    const serverUrl = useRecoilValueLoadable(serverUrlAtom)

    const [itemFilter, setItemFilter] = useState("")
    const [min,setMin] = useState(0.0)
    const [max,setMax] = useState(0.0)

    const [items,setItems] = useState([])
    function updateItems() {
        console.log("http://"+serverUrl.contents+"/items/sort?" )
        try {
            axios.get("http://"+serverUrl.contents+"/items/sort"+`?property=${itemFilter ? itemFilter: "x"}&min=${min ? min : 0}&max=${max ? max : 0}` , {
                headers: {
                    'Auth': username+" "+sID
                }
            })
        }
        catch(e) {
            console.error(e)
        }
        axios.get("http://"+serverUrl.contents+"/items/sort"+`?property=${itemFilter ? itemFilter: "x"}&min=${min ? min : 0}&max=${max ? max : 0}` , {
            headers: {
                'Auth': username+" "+sID
            }
        }).then((res)=> {
            console.log("Items Query Response" , res.data)
            setItems(res.data)
        })
    }

    useEffect(() => {
        async function getItems() {
            console.log("http://"+serverUrl.contents+"/items/sort"+`?property=${itemFilter ? itemFilter : "x"}&min=${min ? min : 0}&max=${max ? max : 0}` )
            let res = await axios.get("http://"+serverUrl.contents+"/items/sort"+`?property=${itemFilter ? itemFilter: "x"}&min=${min ? min : 0}&max=${max ? max : 0}` , {
                headers: {
                    'Auth': username+" "+sID
                }
            })
            console.log("Items Query Response" , res.data)
            setItems(res.data)
        }
        getItems()
    },[setItems])

  return (
    <View style={styles.container} className="flex-1">
        <Searchbar
        placeholder='Search By Property'
        className=""
        onChangeText={setItemFilter}
        value= {itemFilter}
        mode="bar"
        icon={"magnify"}
        style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" , borderWidth : 0.3 , borderColor:"#ad08ff" , borderRadius:10}}
      ></Searchbar>
        <View className="display-flex justify-between flex-row">
        <Searchbar
            placeholder='Min'
            onChangeText={setMin}

            value= {min}
            mode="bar"
            className="w-[40%] mt-5 m-2"
            icon={"magnify"}
            style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" , borderWidth : 0.3 , borderColor:"#ad08ff" , borderRadius:10}}
        ></Searchbar>
        <Searchbar
            placeholder='Max'
            onChangeText={setMax}
            value= {max}
            mode="bar"
            className="w-[40%] mt-5 m-2"
            icon={"magnify"}
            style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" , borderWidth : 0.3 , borderColor:"#ad08ff" , borderRadius:10}}
        ></Searchbar>
           
        </View>
        <Button mode="outlined" onPress={()=>updateItems()} style={styles.button} className="mb-5">
            <Text style={{color:"black"}}>Query</Text>
        </Button>


      <ScrollView>
        {items.map((item, index) => {
            return (<FoodHorizontalCard food={item}></FoodHorizontalCard>)
        })}
      </ScrollView>

    </View>
  );
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
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
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
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderColor: '#cd83f2',
    shadowColor: '#ad08ff',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button : {
    color: "black",
    borderWidth:0.2,
    borderRadius:10
    },
});
