import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../auth';
import { updateProfile, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

const CustomUserDataScreen = () => {

  const { t } = useTranslation();

  const { user, profileImage, setProfileImage } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setSurname(userData.surname || '');
          if (userData.dob) {
            const dateOfBirth = new Date(userData.dob);
            if (!isNaN(dateOfBirth)) {
              setDob(dateOfBirth);
            }
          }
          setProfileImage(userData.photoURL || '');
        }
      } catch (error) {
        console.error("Error loading user data: ", error);
      }
    };

    loadUserData();
  }, [user.uid]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (password) {
        await updatePassword(currentUser, password);
      }
      await updateProfile(currentUser, {
        displayName: name,
        photoURL: profileImage,
      });
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        name,
        surname,
        dob: dob.toISOString().split('T')[0], //YYYY-MM-DD
        photoURL: profileImage,
      });
      Alert.alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert('Error updating profile');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || dob;
      setDob(currentDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.uploadText}>{t('Upload_photo')}</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Name')}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Surname')}</Text>
        <TextInput
          style={styles.input}
          value={surname}
          onChangeText={setSurname}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('DoB')}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={dob.toISOString().split('T')[0]} // Mostrar la fecha en formato YYYY-MM-DD
            editable={false} // Evitar que el usuario escriba directamente en el campo
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('New_Password')}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Confirm_New_Password')}</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <Button title={t('Update_profile')} onPress={handleUpdate} />
    </View>
  );
};

export default CustomUserDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  uploadText: {
    textAlign: 'center',
    color: '#0000ff',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
