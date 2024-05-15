import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style'
import { icon, icons, SIZES } from '../../../constants' 

const musicGenres = ["Pop", "Rock", "ADD MORE"] //Cambiar!!!

const Welcome = () => {
  const router = useRouter();
  const [activeMusicGenre, setActiveMusicGenres] = useState("Pop");

  return (
    <View>
      <View styles={styles.container}>
        <Text style={styles.userName}>Welcome</Text>
        <Text style={styles.welcomeMessage}>Enjoy your favorite music!</Text>
      </View> 

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value='' onChange={()=>{}} placeholder='Search for any song'/>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}> 
        <FlatList
          data={musicGenres}
          renderItem={({ item })=> (
            <TouchableOpacity 
              style={styles.tab(activeMusicGenre, item)}
              onPress={() => {
                setActiveMusicGenres(item);
                router.push(`/search/${item}`)
              }}>
              <Text style={styles.tabText(activeMusicGenre, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyStractor = {item => item} //que hace
          contentContainerStyle = {{ columnGap: SIZES.small}}
          horizontal
        />
      </View>
      
    </View>
  )
}

export default Welcome