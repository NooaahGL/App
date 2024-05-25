import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularplaylists.styles'
//import styles from './myplaylists.styles'
import { COLORS, SIZES } from '../../../constants'
import { useTranslation } from 'react-i18next';


import {getAllPlaylist,} from '../../../playlistFunctions/playlistFunctions.js'
import { useAuth } from '../../../context/AuthContext.js';


import {PopularPlaylistItem, MyPlaylistItem} from './PlaylistItem.jsx'


const PopularPlaylists = () => {

  const { t } = useTranslation();
  const isLoading = false;
  const error = false;

  data = [ "Top 50: Global", "Top 50: España", "Los 50 más virales: Global", "Los 50 más virales: España", "Fresh Finds España", "Novedades Viernes España"]
  const slicedData = data.slice(0, 3);


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
            data={slicedData}
            
            renderItem={ ( {item} ) => (
              <PopularPlaylistItem name={item} />
            )}
            contentContainerStyle = {{ columnGap: SIZES.medium}}
            initialNumToRender={3}
          />
        )}
      </View>
    </View>
  )
}

const MyLists = () => {

    const isLoading = false;
    const error = false;
    
    const { user } = useAuth(); 
    const { t } = useTranslation();
  
    const [playlists, setPlaylists] = useState([]);
  
    useEffect(() => {
      const fetchPlaylists = async () => {
        const fetchedPlaylists = await getAllPlaylist(user);
        const slicedData = fetchedPlaylists.slice(0, 3);
  
        setPlaylists(slicedData);
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
              <MyPlaylistItem {...item}/>
            )}
            contentContainerStyle = {{ columnGap: SIZES.medium}}
            
          />
        )}
      </View>
    </View>
    )
  }
  

export {PopularPlaylists, MyLists};