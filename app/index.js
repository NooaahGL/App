import { useState, useEffect} from "react";
import { ScrollView, SafeAreaView, View, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SIZES, COLORS } from "../constants";
import { Home } from "../components/home/mainhome/mainhome";
import { AuthScreen, auth, handleAuthentication} from "../components/users/authentication/authentication";
import {  onAuthStateChanged } from '@firebase/auth';

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return(
      
      <SafeAreaView style={{ flex:1, backgroundColor: COLORS.lightWhite }}>
          <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ flex:1, padding: SIZES.medium }}>
                  {user ? (
                    <Home user={user} handleAuthentication={handleAuthentication} />
                  ) : (
                    <AuthScreen
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                      handleAuthentication={handleAuthentication}
                    />
                  )}
              </View>
          </ScrollView>

      </SafeAreaView>

  )
}