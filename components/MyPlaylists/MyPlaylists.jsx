import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import styles from './myplaylists.styles';
import { COLORS, SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { getAllPlaylist } from '../../playlistFunctions/playlistFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

import { MyPlaylistItem } from '../PlaylistItem/PlaylistItem.jsx';

const MyPlaylists = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const fetchedPlaylists = await getAllPlaylist(user);
        setPlaylists(fetchedPlaylists.slice(0, 3)); // Mostrar solo un máximo de 3 playlists
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchPlaylists();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('My_Playlists')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('All my Playlists')}>
          <Text>{t('Show_all')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tokensContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{t('An_error_has_ocurred')}</Text>
        ) : (
          <FlatList
            data={playlists}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Playlist Tracks', { playlistId: item.id })}>
                <MyPlaylistItem {...item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default MyPlaylists;
