import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from '@firebase/firestore';
import { addPlaylist, addSongToPlaylist } from '../../playlistFunctions/playlistFunctions';
import { useTranslation } from 'react-i18next';

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const transitionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

        const playlistId = await addPlaylist(credential.user, 'My Favorite Songs');
        await addSongToPlaylist(credential.user, playlistId, "6Ec5LeRzkisa5KJtwLfOoW");

        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleToggle = () => {
    Animated.timing(transitionAnim, {
      toValue: isLogin ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsLogin(!isLogin));
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.authContainer, { transform: [{ scale: transitionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1]
      }) }] }]}>
        <Text style={styles.title}>{isLogin ? t('Sign In') : t('Sign Up')}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          onSubmitEditing={handleAuthentication} // Permitir el envío con "Enter"
          returnKeyType="done" // Cambiar el tipo de retorno a "done"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          onSubmitEditing={handleAuthentication} // Permitir el envío con "Enter"
          returnKeyType="done" // Cambiar el tipo de retorno a "done"
        />
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleAuthentication}
          >
            <Button color={COLORS.tertiary} title={isLogin ? t('Enter') : t('Create an account')} />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.toggleText} onPress={handleToggle}>
          {isLogin ? t('Need an account? Sign Up') : t('Already have an account? Sign In')}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium, 
    backgroundColor: COLORS.lightWhite, 
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: COLORS.white, 
    padding: SIZES.medium, 
    borderRadius: SIZES.large, 
    elevation: 3,
  },
  title: {
    fontSize: 22, 
    marginBottom: SIZES.medium, 
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: COLORS.lightGray, 
    borderWidth: 1,
    marginBottom: SIZES.medium, 
    padding: SIZES.small, 
    borderRadius: SIZES.small, 
  },
  toggleText: {
    color: COLORS.primary, 
    textAlign: 'center',
  },
});

export default AuthenticationScreen;
