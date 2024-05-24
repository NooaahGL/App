import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { SIZES, COLORS } from "../../constants";
import add from '../../assets/icons/add.png'
import { useNavigation } from '@react-navigation/native'; 

import Welcome from "../HomeScreen/Welcome/Welcome";
import PopularPlaylists from './PopularPlaylists/PopularPlaylists';
import MyLists from './MyPlaylists/MyPlaylists';
import Track from '../../spotifyApi/Track.js';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

  const navigation = useNavigation();
  const handleAddPlaylist = () => {
    navigation.navigate('AddListScreen');
  };

  //Track tests
  const trackTest = async () => {
    // Perform actions using the access token
    const song = new Track('7MVIfkyzuUmQ716j8U7yGR');
    // Fetch track details
    await song.fetchTrackDetails();
    console.log(song.trackInfo());
    // Search for album
    const playlistID = await Track.searchPlaylist("Top 50: España");
    const playlist = await Track.createPlaylist(playlistID);
    /*playlist.forEach(track => {
      console.log(track.playlistInfo())
    });*/
    // Construct track info string
    const playlistInfoString = playlist.map(track => track.getName()).join("\n\n");
    console.log(playlistInfoString);
  }
  trackTest();

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
