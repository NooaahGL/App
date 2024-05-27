import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import HomeScreen from '../components/HomeScreen/HomeScreen';
import AuthenticationScreen from '../components/AuthenticationScreen/AuthenticationScreen';
import AddListScreen from '../components/AddListScreen/AddListScreen';
import CustomUserDataScreen from '../components/CustomUserDataScreen/CustomUserDataScreen';
import SettingsScreen from '../components/SettingsScreen/SettingsScreen';
import MyPlaylistsExtended from '../components/MyPlaylists/MyPlaylistsExtended';
import PlaylistTracks from '../components/PlaylistTracks/PlaylistTracks';
import SearchSongScreen from '../components/SearchSongScreen/SearchSongScreen';
import PopularPlaylistsTracks from '../components/HomeScreen/PopularPlaylists/PopularPlaylistsTracks';
import ScreenHeaderBtn from "../components/ScreenHeaderBtn/ScreenHeaderBtn";

import { SIZES, COLORS, images } from "../constants";
import LeftMenu from '../components/LeftMenu/LeftMenu';
import { useAuth } from '../context/AuthContext';
import Flag from 'react-native-flags';
import { useLocation } from '../Location/Location';
import { runOnJS, useSharedValue, withSpring, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const [isLeftMenuVisible, setLeftMenuVisible] = useState(false);
  const [isRightMenuVisible, setRightMenuVisible] = useState(false);

  const { cityAndCountry, countryCode } = useLocation();
  const { profileImage } = useAuth();

  const [flagSize, setFlagSize] = useState(32);

  const flagScale = useSharedValue(1);

  const handleOutsidePress = () => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
  };

  const onFlagPress = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setFlagSize(40); // Cambia el tamaño a 40 cuando se presiona la bandera
    } else if (event.nativeEvent.state === State.END) {
      setFlagSize(32); // Restablece el tamaño a 32 cuando se suelta la bandera
    }
  };

  const animatedFlagStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: flagScale.value }], // Aplicar la escala animada
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Authentication" component={AuthenticationScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen}
              options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                  <ScreenHeaderBtn iconUrl={profileImage ? { uri: profileImage } : images.profile} dimension="100%"
                    onPress={(e) => {
                      e.stopPropagation();
                      setLeftMenuVisible(!isLeftMenuVisible);
                      setRightMenuVisible(false);
                    }}
                  />
                ),
                headerRight: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: SIZES.medium }}>
                      {cityAndCountry ? `${cityAndCountry}` : 'Ubicación no disponible'}
                    </Text>
                    {countryCode && (
                      <TouchableWithoutFeedback>
                        <PanGestureHandler onHandlerStateChange={onFlagPress}>
                          <Flag code={countryCode} size={flagSize} style={{ marginRight: 5 }} />
                        </PanGestureHandler>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                ),
                headerTitle: '',
              }}
            />
            <Stack.Screen name="AddListScreen" component={AddListScreen} />
            <Stack.Screen name="Custom User Data" component={CustomUserDataScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name='All my Playlists' component={MyPlaylistsExtended} />
            <Stack.Screen name="Playlist Tracks" component={PlaylistTracks} />
            <Stack.Screen name='Search Song' component={SearchSongScreen} />
            <Stack.Screen name='Popular Playlists Tracks' component={PopularPlaylistsTracks} />
          </Stack.Navigator>
          <LeftMenu visible={isLeftMenuVisible} onClose={handleOutsidePress} />
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  leftMenuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
