import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './myplaylists.styles.js';
import { COLORS, SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';

import { getAllPlaylist } from '../../playlistFunctions/playlistFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

import { MyPlaylistItem } from '../PlaylistItem/PlaylistItem.jsx';

const MyPlaylistsExtended = () => {
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
        setPlaylists(fetchedPlaylists);
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
        <Text style={styles.headerTitle}>{t("All_my_Playlists")}</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate('Playlist Tracks', { user: user, playlistId: item.id, playlistName: item.name })}>
                <MyPlaylistItem {...item} />
              </TouchableOpacity>
            )}

            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default MyPlaylistsExtended;
