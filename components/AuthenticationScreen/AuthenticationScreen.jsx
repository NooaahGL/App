import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../auth';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, doc, setDoc } from '@firebase/firestore';
import {addPlaylist, addSongToPlaylist} from '../../playlistFunctions/playlistFunctions.js'


const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
        navigation.navigate('HomeScreen');
      } else {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        
        const userDocRef = doc(db, 'users', credential.user.uid);
          await setDoc(userDocRef, {
            uid: credential.user.uid,
            email: email,
            name: "",
            surname: "",
            dob: "",
            photoURL: ""
          });
  
          //Create a playlists collection with one playlist for the new user
          const playlistId = await addPlaylist(credential.user, 'My Favorite Songs');
          await addSongToPlaylist(credential.user, playlistId, 'Lejos', 'Delaossa');

        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Enter' : 'Create an account'} onPress={handleAuthentication} color="#3498db" />
        </View>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
      },
      buttonContainer: {
        marginBottom: 16,
      },
      toggleText: {
        color: '#3498db',
        textAlign: 'center',
      },
      bottomContainer: {
        marginTop: 20,
      },
      emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
      },
      additionalText: {
        textAlign: 'center',
        color: '#777',
      }
});

export default AuthenticationScreen;
