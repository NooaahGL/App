import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';
import { AuthProvider } from './context/AuthContext';
import { fetchAccessToken } from './authSpotify';

export default function App() {
  fetchAccessToken();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
