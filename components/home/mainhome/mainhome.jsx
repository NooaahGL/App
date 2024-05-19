import React, { useState, useRef } from 'react';
import { View, ScrollView, SafeAreaView, Animated, TouchableOpacity, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { SIZES, COLORS, icons, images } from "../../../constants";
import { Stack } from "expo-router";
import { Mysongs, Popularsongs, ScreenHeaderBtn, Welcome } from "../../../components";
import styles from '../welcome/welcome.style';

const { width } = Dimensions.get('window');

const Home = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLeftMenuVisible, setLeftMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current; // Initial value for slide animation
  const leftSlideAnim = useRef(new Animated.Value(-width)).current; // Initial value for slide animation


  const toggleUserMenu = () => {
    if (isMenuVisible) {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(false);
      });
    } else {
      // Slide in
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleLeftMenu = () => {
    if (isLeftMenuVisible) {
      // Slide out
      Animated.timing(leftSlideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLeftMenuVisible(false);
      });
    } else {
      // Slide in
      setLeftMenuVisible(true);
      Animated.timing(leftSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" onPress={toggleLeftMenu} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" onPress={toggleUserMenu}/>
          ),
          headerTitle: ""
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome />
          <Popularsongs />
          <Mysongs/>
        </View>
      </ScrollView>

      {isMenuVisible && (
        <Animated.View style={[stylesmenu.menu, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity onPress={toggleUserMenu}>
            <Button title="Change personal data" style={styles.Button} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleUserMenu}>
            <Button title="Logout" /*onPress={handleAuthentication}*/ color="#e74c3c" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {isLeftMenuVisible && (
        <Animated.View style={[stylesmenu.leftMenu, { transform: [{ translateX: leftSlideAnim }] }]}>
          <TouchableOpacity onPress={toggleLeftMenu}>
            <Text>Stats</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const stylesmenu = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75, // 75% of the screen width
    backgroundColor: COLORS.lightWhite,
    padding: 20,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75, // 75% of the screen width
    backgroundColor: COLORS.lightWhite,
    padding: 20,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export { Home };
