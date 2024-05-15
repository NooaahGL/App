import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularsongs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularSongToken from '../../common/tokens/popular/PopularSongToken'

const Popularsongs = () => {

  const router = useRouter();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular songs</Text>
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
            data = {[ 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={ ( {item} ) => (
              <PopularSongToken
                item = {item}
              />
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

export default Popularsongs