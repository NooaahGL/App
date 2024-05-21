import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants'

const RightMenu = ({ visible, onClose }) => {

  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigation.navigate('Authentication');
  };

  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
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
});
