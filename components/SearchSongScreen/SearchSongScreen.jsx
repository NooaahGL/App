import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './searchsongscreen.styles';
import { icons } from '../../constants';
import Track from '../../spotifyApi/Track';
import {addSongToPlaylist} from '../../playlistFunctions/playlistFunctions.js'

const SearchSong = ({    }) => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const { user, playlistId } = route.params;
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Función para manejar la búsqueda
  const handleSearch = async () => {
    if (!searchText) return;
    const tracks = await Track.searchTracks(searchText);
    const trackDetailsPromises = tracks.map(id => {
      const track = new Track(id);
      return track.fetchTrackDetails().then(() => track);
    });
    const trackDetails = await Promise.all(trackDetailsPromises);
    setSearchResults(trackDetails);
  };

  const handleSongSelection = async (selectedSong) => {
    await addSongToPlaylist(user, playlistId, selectedSong.id)
    navigation.navigate('HomeScreen');
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value={searchText} 
            onChangeText={setSearchText} 
            placeholder={t('search_for_any_song')} 
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSongSelection(item)}>
            <View style={styles.trackContainer}>
              <Image source={{ uri: item.albumImg }} style={styles.trackImage} />
              <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{item.name}</Text>
                <Text style={styles.trackArtist}>{item.artist.join(', ')}</Text>
                <Text style={styles.trackAlbum}>{item.album}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default SearchSong;
