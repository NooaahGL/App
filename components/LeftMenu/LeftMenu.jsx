import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants';
import { auth, db } from '../../auth';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const LeftMenu = ({ visible, onClose }) => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [deleteAccountActive, setDeleteAccountActive] = useState(false);
  const [customUserDataActive, setCustomUserDataActive] = useState(false);
  const [settingsActive, setSettingsActive] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleLogout = async () => {
    await logout();
    onClose();
    navigation.navigate('Authentication');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      t('alertTitleDeleteAccount'),
      t('alertMessageDeleteAccount'),
      [
        { text: t('cancel'), style: "cancel" },
        { text: t('ok'), onPress: async () => {
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
            Alert.alert(t('errorTitle'), t('errorMessageDeleteAccount'));
          }
        }},
      ]
    );
  };

  const handleMenuOptionPress = (callback, setActiveState) => {
    setActiveState(true);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      callback();
      setActiveState(false);
    });
  };

  const navigateToCustomUserData = () => {
    onClose();
    navigation.navigate('Custom User Data');
  };

  const navigateToSettings = () => {
    onClose();
    navigation.navigate('Settings');
  };

  if (!visible) return null;
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={[styles.menuOption, deleteAccountActive && styles.activeMenuOption]}
        onPress={() => handleMenuOptionPress(handleDeleteAccount, setDeleteAccountActive)}
      >
        <Text style={[styles.menuOptionText, deleteAccountActive && styles.activeMenuOptionText]}>
          {t('Delete_Account')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuOption, customUserDataActive && styles.activeMenuOption]}
        onPress={() => handleMenuOptionPress(navigateToCustomUserData, setCustomUserDataActive)}
      >
        <Text style={[styles.menuOptionText, customUserDataActive && styles.activeMenuOptionText]}>
          {t('Custom_User_Data')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuOption, settingsActive && styles.activeMenuOption]}
        onPress={() => handleMenuOptionPress(navigateToSettings, setSettingsActive)}
      >
        <Text style={[styles.menuOptionText, settingsActive && styles.activeMenuOptionText]}>
          {t('Settings')}
        </Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <Button style={styles.logoutBtn} title={t("Logout")} color="red" onPress={handleLogout} />
    </Animated.View>
  );
};

export default LeftMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
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
  activeMenuOption: {
    backgroundColor: 'lightblue', // Cambia el color de fondo cuando está activo
  },
  menuOptionText: {
    fontSize: 18,
  },
  activeMenuOptionText: {
    color: 'orange', // Cambia el color del texto cuando está activo
  },
});
