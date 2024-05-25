import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import styles from './popularplaylists.styles.js';
import { COLORS, SIZES } from '../../../constants/index.js';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../../../Location/Location.jsx';
import { PopularPlaylistItem } from '../../PlaylistItem/PlaylistItem.jsx';
import { useNavigation } from '@react-navigation/native';

const PopularPlaylists = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [countryName, setCountryName] = useState(null);
  const error = false;
  const navigation = useNavigation();
  const location = useLocation();

  useEffect(() => {
    if (location.countryName) {
      setCountryName(location.countryName);
      setIsLoading(false);
    }
  }, [location.countryName]);

  const handlePlaylistPress = (playlistName) => {
    navigation.navigate('Popular Playlists Tracks', { playlistName });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!countryName) {
    return (
      <View style={styles.container}>
        <Text>{t('An_error_has_ocurred')}</Text>
      </View>
    );
  }

  const data = [
    "Top 50: Global", 
    `Top 50: ${countryName}`, 
    ` ${countryName}`, 
    "Los 50 más virales: Global", 
    "Los 50 más virales: Global", 
    `Fresh Finds ${countryName}`
  ];

  const slicedData = data.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Popular_playlists')}</Text>
      </View>

      <View style={styles.tokensContainer}>
        {error ? (
          <Text>{t('An_error_has_ocurred')}</Text>
        ) : (
          <FlatList
            data={slicedData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlaylistPress(item)}>
                <PopularPlaylistItem name={item} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            initialNumToRender={3}
          />
        )}
      </View>
    </View>
  );
};

export default PopularPlaylists;
