import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import AuthenticationScreen from '../components/AuthenticationScreen/AuthenticationScreen';
import AddListScreen from '../components/AddListScreen/AddListScreen';
import CustomUserDataScreen from '../components/CustomUserDataScreen/CustomUserDataScreen';
import SettingsScreen from '../components/SettingsScreen/SettingsScreen';
import ScreenHeaderBtn from "../components/ScreenHeaderBtn/ScreenHeaderBtn";
import { SIZES, COLORS, images } from "../constants";
import LeftMenu from '../components/LeftMenu/LeftMenu';
import RightMenu from '../components/RightMenu/RightMenu';
import { useAuth } from '../context/AuthContext';
import * as Location from 'expo-location';
import Flag from 'react-native-flags';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const [isLeftMenuVisible, setLeftMenuVisible] = useState(false);
  const [isRightMenuVisible, setRightMenuVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [cityAndCountry, setCityAndCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const { profileImage } = useAuth();

  const handleOutsidePress = () => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Obtener la dirección actual
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (address && address.length > 0) {
        const city = address[0].city;
        const country = address[0].country;
        setCityAndCountry(`${city}, ${country}`);
        
        // Obtener el código del país
        const countryCode = address[0].isoCountryCode;
        setCountryCode(countryCode);
      }
    })();
  }, []);

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
                      setRightMenuVisible(!isRightMenuVisible);
                      setLeftMenuVisible(false);
                    }}
                  />
                ),
                headerRight: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: SIZES.medium }}>
                      {cityAndCountry ? `${cityAndCountry}` : 'Ubicación no disponible'}
                    </Text>
                    {countryCode && <Flag code={countryCode} size={32} style={{ marginRight: 5 }} />}
                  </View>
                ),
                headerTitle: '',
              }}
            />
            <Stack.Screen name="AddListScreen" component={AddListScreen}/>
            <Stack.Screen name="Custom User Data" component={CustomUserDataScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
          </Stack.Navigator>
          <LeftMenu visible={isLeftMenuVisible} />
          <RightMenu visible={isRightMenuVisible} onClose={handleOutsidePress} />
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Navigation;
