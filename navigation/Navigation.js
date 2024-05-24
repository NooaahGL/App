import React, {useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import AuthenticationScreen from '../components/AuthenticationScreen/AuthenticationScreen';
import AddListScreen from '../components/AddListScreen/AddListScreen';
import CustomUserDataScreen from '../components/CustomUserDataScreen/CustomUserDataScreen';
import SettingsScreen from '../components/SettingsScreen/SettingsScreen';
import ScreenHeaderBtn from "../components/ScreenHeaderBtn/ScreenHeaderBtn";
import { SIZES, COLORS, icons, images } from "../constants";
import LeftMenu from '../components/LeftMenu/LeftMenu';
import RightMenu from '../components/RightMenu/RightMenu';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const [isLeftMenuVisible, setLeftMenuVisible] = useState(false);
  const [isRightMenuVisible, setRightMenuVisible] = useState(false);
  const { profileImage } = useAuth();

  const handleOutsidePress = () => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
  };

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
                  <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"
                    onPress={(e) => {
                      e.stopPropagation();
                      setLeftMenuVisible(!isLeftMenuVisible);
                      setRightMenuVisible(false);
                    }}
                  />
                ),
                headerRight: () => (
                  <ScreenHeaderBtn iconUrl={profileImage ? { uri: profileImage } : images.profile} dimension="100%"
                    onPress={(e) => {
                      e.stopPropagation();
                      setRightMenuVisible(!isRightMenuVisible);
                      setLeftMenuVisible(false);
                    }}
                  />
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
  rightMenuContainer: {
    position: 'absolute',
    right: 0,
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
