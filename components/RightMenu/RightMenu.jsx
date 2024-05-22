import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants';
import { auth, db } from '../../auth';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

const RightMenu = ({ visible, onClose }) => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigation.navigate('Authentication');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              await deleteDoc(doc(db, 'users', user.uid));
              await deleteUser(user);
              onClose();
              navigation.navigate('Authentication');
            }
          } catch (error) {
            console.error("Error deleting account: ", error);
            Alert.alert("Error", "There was an error deleting your account.");
          }
        }},
      ]
    );
  };

  const navigateToCustomUserData = () => {
    onClose();
    navigation.navigate('Custom User Data');
  };

  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.menuOption} onPress={handleDeleteAccount}>
        <Text style={styles.menuOptionText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuOption} onPress={navigateToCustomUserData}>
        <Text style={styles.menuOptionText}>Custom User Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuOption} onPress={() => { /* Add navigation or functionality for Option 3 */ }}>
        <Text style={styles.menuOptionText}>Settings</Text>
      </TouchableOpacity>
      <Button style={styles.logoutBtn} title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

export default RightMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: Constants.statusBarHeight,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logoutBtn: {
    alignSelf: 'flex-end',
    position: 'center',
    left: 0,
    right: 0
  },
  spacer: {
    flex: 1,
  },
  menuOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuOptionText: {
    fontSize: 18,
  },
});
