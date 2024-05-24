import Navigation from './navigation/Navigation';
import { AuthProvider } from './context/AuthContext'
import { fetchAccessToken } from './authSpotify';

export default function App() {

  fetchAccessToken();

  return (
    //AuthProvider: Manage of when the user signin and signout
    //Navigation: Manage of the screens in the app
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
}