import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';
import { TrackMyListByIdDelete } from '../HomeScreen/TracksList/TrackList';
import styles from '../MyPlaylists/myplaylists.styles';

const PlaylistTracks = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, playlistId, playlistName } = route.params;
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      const tracks = await getPlaylistTracks(user, playlistId);
      setPlaylistTracks(tracks);
    };
    fetchPlaylistTracks();
  }, [playlistId]);

  return (
    <View style={customStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{playlistName}</Text>
      </View>
      <View>
        <TrackMyListByIdDelete children={ playlistId} />
      </View>
      <TouchableOpacity 
        style={customStyles.addButton} 
        onPress={() => navigation.navigate('Search Song', { user: user, playlistId: playlistId })}
      >
        <Text style={customStyles.addButtonText}>Add Song</Text>
      </TouchableOpacity>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    padding: 20,
  },
  addButton: {
    backgroundColor: COLORS.tertiary,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlaylistTracks;
