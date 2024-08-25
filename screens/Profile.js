// screens/HomePage.js
import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { Card , text} from 'react-native-paper';

export default function HomePage({ route }) {
  const { username } = route.params;
  username == null ? username = "test" : true


  const [canteenFilter, setCanteenFilter] = useRecoilState(homeCanteenSearchAtom)

  return (
    <View style={styles.container}>
      <View className="mb-5 flex-row justify-between">
        <Text style={styles.header}>Welcome {username}!</Text>
        <Button mode="contained" onPress={() => console.log('Pressed')} style={{borderRadius:1000 , height:50 , width:20 , backgroundColor:"#f6e8fc"}}>
        </Button>
      </View>

      <Searchbar
        placeholder='Search Canteens'
        onChangeText={setCanteenFilter}
        value= {canteenFilter}
        mode="bar"
        className="mb-5"
        style={{backgroundColor:"white" , shadowColor:"#ad08ff" , borderColor : "black" , borderWidth : 0.3 , borderColor:"#ad08ff" , borderRadius:10}}
      ></Searchbar>
      <ScrollView>
        {/* Render Canteen Cards */}
        {[...Array(10)].map((_, index) => (<CanteenCard canteenID={index}></CanteenCard>
        ))}
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
});
