import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './welcome.styles';
import { icons, SIZES } from '../../../constants';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>{t('welcome')}</Text>
        <Text style={styles.welcomeMessage}>{t('enjoy_your_favorite_music')}</Text>
      </View> 

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value='' 
            onChange={() => {}} 
            placeholder={t('search_for_any_song')} 
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
