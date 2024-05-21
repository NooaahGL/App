import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,FlatList } from 'react-native'

import styles from './myplaylists.styles'
import { COLORS, SIZES } from '../../../constants'
import PlaylistsCards from '../PlaylistsCards/PlaylistsCards'
import {getAllPlaylist, getAllPlaylistNames, getAllPlaylistId} from '../../../playlistFunctions/playlistFunctions.js'
import { useAuth } from '../../../context/AuthContext.js';

const MyLists = () => {

  const isLoading = false;
  const error = false;
  
  const { user } = useAuth(); 

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      await getAllPlaylistId(user);
      await getAllPlaylistNames(user);
      const fetchedPlaylists = await getAllPlaylist(user);
      setPlaylists(fetchedPlaylists);
    };

    if (user) fetchPlaylists();
  }, [user]);

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Lists</Text>
      <TouchableOpacity>
        <Text>Show all</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.tokensContainer}>
      { isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary} />
      ) : error ? (
        <Text>An error has ocurred</Text>
      ) : (
        <FlatList
          data = {playlists}
          renderItem={ ( {item} ) => (
            <PlaylistsCards
              item = {item}
            >
            {item.name}
            </PlaylistsCards>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle = {{ columnGap: SIZES.medium}}
          horizontal
        />
      )}
    </View>
  </View>
  )
}

export default MyLists