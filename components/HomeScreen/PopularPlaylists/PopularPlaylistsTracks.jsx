import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Track from '../../../spotifyApi/Track'; // Asegúrate de importar la clase Track

const PopularPlaylistsTracks = ({ route }) => {
  const { playlistName } = route.params; // Obtén el nombre de la playlist de los parámetros de navegación
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const playlistId = await Track.searchPlaylist(playlistName);
        const tracks = await Track.createPlaylist(playlistId);
        setTracks(tracks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tracks:', error.message);
      }
    };

    fetchTracks();
  }, [playlistName]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`"${playlistName}" Tracks`}</Text>
      <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            <Image source={{ uri: item.getAlbumImg() }} style={styles.albumImage} />
            <View style={styles.trackInfo}>
              <Text style={styles.trackName}>{item.getName()}</Text>
              <Text style={styles.albumName}>{item.getAlbum()}</Text>
              <Text style={styles.artistName}>{item.getArtist().join(', ')}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.getId()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  albumName: {
    fontSize: 14,
  },
  artistName: {
    fontSize: 14,
    color: '#777',
  },
});

export default PopularPlaylistsTracks;
