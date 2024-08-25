import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button , TextInput } from 'react-native-paper';
import {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom , serverUrlAtom} from "./atoms"
import { useRecoilState, useRecoilValue ,useRecoilValueLoadable} from 'recoil';
import axios from 'axios';

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [bakedUsername , setBakedUsername] = useRecoilState(userNameAtom);
  const [bakedPassword, setBakedPassword] = useRecoilState(passwordAtom);
  const [sID, setSID] = useRecoilState(sIDAtom);
  const serverUrl = useRecoilValueLoadable(serverUrlAtom)



  const handleLogin = () => {
    if (username === '') {
      alert('Please enter your enrollment number');
      return;
    }
    if(password === '') {
      alert("Invalid Password")
      return;
    }
    console.log(serverUrl.contents+"/users/login",{
      enrollmentNumber : username,
      password : password
    })
    axios.put("http://"+serverUrl.contents+"/users/login" , {
      enrollmentNumber : username,
      password : password
    }).then((res)=> {
      console.log(res.data,res.status)
      if(res.status !== 200) {
        alert("Invalid Username or Password")
        return;
      }
      setSID(res.data.sessionToken)
      setBakedPassword(password)
      setBakedUsername(res.data.enrollmentNumber)
      navigation.navigate('Home', { username });
    })
    return;
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>TasteTailor</Text>
      <TextInput
        placeholder="Enrollment No"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        cursorColor='purple'
        activeOutlineColor='purple'
        backgroundColor="white"
        outlineColor='black'
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        mode="outlined"
        cursorColor='purple'
        value={password}
        onChangeText={setPassword}
        activeOutlineColor='purple'
        backgroundColor="white"
        outlineColor='black'
        outlineStyle = {styles.inpout}
      />
    <Button mode="elevated" className="mt-5" onPress={handleLogin} compact={true} buttonColor='white' textColor='purple'>
      Login
    </Button>
    <Button mode="elevated" className="mt-5" onPress={() => console.log("fafa")} compact={true} buttonColor='white' textColor='purple'>
      Register
    </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inpout: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle:'solid',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'purple',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 70,
    textAlign: 'center',
    color: 'purple',
    fontFamily: 'Calibri'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
