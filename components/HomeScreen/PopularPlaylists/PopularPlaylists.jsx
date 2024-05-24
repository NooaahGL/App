import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularplaylists.styles'
import { COLORS, SIZES } from '../../../constants'
import PlaylistsCards from '../PlaylistsCards/PlaylistsCards'
import { useTranslation } from 'react-i18next';


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
            data = {[ 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={ ( {item} ) => (
              <PlaylistsCards
                item = {item}
              >
              hola1
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