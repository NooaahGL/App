import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants'

const LeftMenu = ({ visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <Text>Left Menu Content</Text>
    </View>
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
});