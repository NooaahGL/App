import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './welcome.styles';
import { icons, SIZES } from '../../../constants';

const Welcome = () => {

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
      
    </View>
  );
}

export default Welcome;

