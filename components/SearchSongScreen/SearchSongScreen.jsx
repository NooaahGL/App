import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './searchsongscreen.styles';
import { icons } from '../../constants';
import Track from '../../spotifyApi/Track';

const SearchSong = ({ navigation }) => {
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
    // Aquí puedes agregar lógica para agregar la canción a la lista de reproducción
    // Por ahora, solo pasaremos la canción seleccionada a PlaylistTracks
    navigation.navigate('Playlist Tracks', { selectedSong: selectedSong });
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
