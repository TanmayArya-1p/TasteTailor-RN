// screens/LoginPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button , TextInput } from 'react-native-paper';

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username === '') {
      alert('Please enter your enrollment number');
      return;
    }
    if (username === 'admin') {
      navigation.navigate('Home', { username });
      return;
    }

    navigation.navigate('Home', { username });

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
        activeOutlineColor='purple'
        backgroundColor="white"
        outlineColor='black'
        outlineStyle = {styles.inpout}
      />
    <Button mode="elevated" className="mt-5" onPress={handleLogin} compact={true} buttonColor='white' textColor='purple'>
      Login
    </Button>
    <Button mode="elevated" className="mt-5" onPress={() => console.log('Pressed')} compact={true} buttonColor='white' textColor='purple'>
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
