import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };

export const db = getFirestore(app);
export const USERS_REF = 'users';
export const TODOS_REF = 'todos';