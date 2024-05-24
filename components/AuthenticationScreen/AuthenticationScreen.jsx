import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {COLORS, SIZES} from '../../constants';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../auth';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, doc, setDoc } from '@firebase/firestore';
import {addPlaylist, addSongToPlaylist} from '../../playlistFunctions/playlistFunctions.js'
import { useTranslation } from 'react-i18next';


const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  const { t } = useTranslation();

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
        <View >
          <TouchableOpacity>
            <Button color={COLORS.tertiary} title={isLogin ? 'Enter' : 'Create an account'} onPress={handleAuthentication}  />
          </TouchableOpacity>
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
    padding: SIZES.medium, // Utiliza el tamaño de padding común
    backgroundColor: COLORS.lightWhite, // Utiliza el color de fondo común
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: COLORS.white, // Utiliza el color de fondo común
    padding: SIZES.medium, // Utiliza el tamaño de padding común
    borderRadius: SIZES.large, // Utiliza el tamaño de border radius común
    elevation: 3,
  },
  title: {
    fontSize: 22, // Utiliza el tamaño de fuente común
    marginBottom: SIZES.medium, // Utiliza el tamaño de margen común
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: COLORS.lightGray, // Utiliza el color de borde común
    borderWidth: 1,
    marginBottom: SIZES.medium, // Utiliza el tamaño de margen común
    padding: SIZES.small, // Utiliza el tamaño de padding común
    borderRadius: SIZES.small, // Utiliza el tamaño de border radius común
  },
  buttonContainer: {
    marginBottom: SIZES.medium, // Utiliza el tamaño de margen común
    backgroundColor: "red",
  },
  toggleText: {
    color: COLORS.primary, // Utiliza el color de los estilos comunes
    textAlign: 'center',
  },
});

export default AuthenticationScreen;
