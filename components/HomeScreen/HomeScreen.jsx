import React, { useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Dimensions, StyleSheet, Image, BackHandler, FlatList } from 'react-native';
import { SIZES, COLORS } from "../../constants";
import add from '../../assets/icons/add.png';
import { useNavigation } from '@react-navigation/native'; 

import Welcome from "../HomeScreen/Welcome/Welcome";
import PopularPlaylists from './PopularPlaylists/PopularPlaylists.jsx';
import MyPlaylists from '../MyPlaylists/MyPlaylists.jsx';
import Track from '../../spotifyApi/Track.js';
import { useAuth } from '../../context/AuthContext.js';

import { deleteSongFromPlaylist } from '../../playlistFunctions/playlistFunctions.js';

const HomeScreen = () => {

  const navigation = useNavigation();
  const handleAddPlaylist = () => {
    navigation.navigate('AddListScreen');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Prevent going back to AuthenticationScreen
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: SIZES.medium }}>
      {item}
    </View>
  );

  const data = [
    <Welcome key="welcome" />,
    <PopularPlaylists key="popular-playlists" />,
    <MyPlaylists key="my-playlists" />
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: SIZES.medium }}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnContainer} onPress={handleAddPlaylist}>
          <Image
            source={add}
            resizeMode='cover'
            style={styles.btnImg("80%")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
