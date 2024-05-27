import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { runOnJS } from 'react-native-reanimated';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [cityAndCountry, setCityAndCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountry] = useState(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
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
          runOnJS(setCityAndCountry)(`${city}, ${country}`);
          runOnJS(setCountry)(country);
          // Obtener el código del país
          runOnJS(setCountryCode)(address[0].isoCountryCode);
        }
      } catch (error) {
        console.error("Error obteniendo la ubicación: ", error);
      }
    };

    getLocationAsync();
  }, []);

  return { cityAndCountry, countryCode, countryName };
}
