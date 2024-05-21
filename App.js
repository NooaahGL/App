import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    //AuthProvider: Manage of when the user signin and signout
    //Navigation: Manage of the screens in the app
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
}