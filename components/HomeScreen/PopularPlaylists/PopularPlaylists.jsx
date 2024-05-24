import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularplaylists.styles'
import { COLORS, SIZES } from '../../../constants'
import PlaylistsCards from '../PlaylistsCards/PlaylistsCards'
import { useTranslation } from 'react-i18next';

import Track from '../../../spotifyApi/Track.js'

const PopularPlaylists = () => {

  const { t } = useTranslation();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Popular_playlists')}</Text>
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
            data = {[ "Top 50: Global", "Top 50: España", "Los 50 más virales: Global", "Los 50 más virales: España", "Fresh Finds España", "Novedades Viernes España"]}
            renderItem={ ( {item} ) => (
              <PlaylistsCards
                item = {Track.searchPlaylist(item)}
              >
              {item}
              </PlaylistsCards>
            )}
            keyExtractor = {item => item?.song_id}
            contentContainerStyle = {{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default PopularPlaylists