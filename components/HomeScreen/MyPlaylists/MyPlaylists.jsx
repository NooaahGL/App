import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,FlatList } from 'react-native'

import styles from './myplaylists.styles'
import { COLORS, SIZES } from '../../../constants'
import PlaylistsCards from '../PlaylistsCards/PlaylistsCards'
import {getAllPlaylist, getAllPlaylistNames, getAllPlaylistId} from '../../../playlistFunctions/playlistFunctions.js'
import { useAuth } from '../../../context/AuthContext.js';
import { useTranslation } from 'react-i18next';


const MyLists = () => {

  const isLoading = false;
  const error = false;
  
  const { user } = useAuth(); 
  const { t } = useTranslation();

  const [playlists, setPlaylists] = useState([]);
/*
  import { useNavigation } from '@react-navigation/native'; 
  const navigation = useNavigation();
  const fetchedPlaylists = navigation.addListener('focus', async () => {
    await getAllPlaylist(user);
  });
*/
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
      <Text style={styles.headerTitle}>{t('My_Lists')}</Text>
      <TouchableOpacity>
        <Text>{t('Show_all')}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.tokensContainer}>
      { isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary} />
      ) : error ? (
        <Text>{t('An_error_has_ocurred')}</Text>
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
          contentContainerStyle = {{ columnGap: SIZES.medium}}
          horizontal
        />
      )}
    </View>
  </View>
  )
}

export default MyLists