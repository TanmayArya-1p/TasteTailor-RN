// screens/HomePage.js
import React ,{useState} from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { Card , text} from 'react-native-paper';
import CanteenCard from './components/Canteen';
import { Searchbar , DataTable } from 'react-native-paper';
import { useRecoilState, useRecoilValue } from 'recoil';
import {homeCanteenSearchAtom} from "./atoms"
import { Button } from 'react-native-paper';
import Modal from "react-native-modal";
import {userNameAtom,passwordAtom} from './atoms'

export default function UserSettings({ route }) {

    const username = useRecoilValue(userNameAtom)
    const password = useRecoilValue(passwordAtom)


    return (
    <View style={styles.container}>
     <Text style={styles.header}>Enrollment No: {username}</Text>
     <Text style={styles.header}>Password: {password}</Text>
     <View>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    Taste Property
                </DataTable.Title>
            <DataTable.Title numeric>Your Profile</DataTable.Title>
            <DataTable.Title numeric>Other's Equivalent Profile</DataTable.Title>
            <DataTable.Row>
            <DataTable.Cell numeric>1</DataTable.Cell>
            <DataTable.Cell numeric>2</DataTable.Cell>
            <DataTable.Cell numeric>3</DataTable.Cell>
            </DataTable.Row>
            </DataTable.Header>
        </DataTable>
     </View>

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
