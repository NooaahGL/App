import { initializeApp } from '@firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAH4GqfRDQjgVyapfVE0w5vXClJ4l9YaSs",
    authDomain: "spotify-f3169.firebaseapp.com",
    projectId: "spotify-f3169",
    storageBucket: "spotify-f3169.appspot.com",
    messagingSenderId: "745962743593",
    appId: "1:745962743593:web:e27cb59a84370445373938",
    measurementId: "G-KJQVSG1MPX"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore();

export { auth, db};
