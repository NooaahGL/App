import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { initializeApp } from '@firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


import styles from "./authentication.style"

const firebaseConfig = {
    apiKey: "AIzaSyBfNV5sEh32e2g6eK7TccjAN6PGGhkJn64",
    authDomain: "login-bd107.firebaseapp.com",
    projectId: "login-bd107",
    storageBucket: "login-bd107.appspot.com",
    messagingSenderId: "609624416788",
    appId: "1:609624416788:web:51dc76395e59c406debd01",
    measurementId: "G-XMFKTZED0Q"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
    return (
      <View style={styles.authContainer}>
         <Text style={styles.title}>{isLogin ? 'Sign In' : 'Welcome: Sign Up'}</Text>
  
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
          {!isLogin && (
            <Text style={styles.additionalText}>
              Atention: Password should be at least 6 characters.
            </Text>
          )}
  
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Enter' : 'Create an account'} onPress={handleAuthentication} color="#3498db" />
        </View>
  
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    );
  }

export { AuthScreen, auth};