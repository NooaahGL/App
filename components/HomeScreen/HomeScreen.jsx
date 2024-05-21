import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { SIZES, COLORS } from "../../constants";
import add from '../../assets/icons/add.png'
import { useNavigation } from '@react-navigation/native'; 

import Welcome from "../HomeScreen/Welcome/Welcome";
import PopularPlaylists from './PopularPlaylists/PopularPlaylists';
import MyLists from './MyPlaylists/MyPlaylists';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

  const navigation = useNavigation();
  const handleAddPlaylist = () => {
    navigation.navigate('AddListScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome />
          <PopularPlaylists />
          <MyLists />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnContainer} onPress={handleAddPlaylist}>
          <Image
            source={add}
            resizeMode='cover'
            style = {styles.btnImg("80%")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 24,
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.50,
    tintColor: COLORS.tertiary,
  }),
});

export default HomeScreen;
