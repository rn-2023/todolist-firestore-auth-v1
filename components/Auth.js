import { Alert } from 'react-native';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, USERS_REF } from '../firebase/Config';

export const signUp = async (nickname, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setDoc(doc(db, USERS_REF, userCredential.user.uid), {
      nickname: nickname,
      email: userCredential.user.email  
    })
  })
  .catch((error) => {
    console.log("Registration failed. " + error.message);
    Alert.alert("Registration failed. " + error.message);
  })
}

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    console.log("Logged in successfully.");
  })
  .catch((error) => {
    console.log("Login failed. " + error.message);
    Alert.alert("Login failed. " + error.message);
  })
}

export const logout = async () => {
  await signOut(auth)
  .then(() => {
    console.log("Logged out successfully.");
  })
  .catch((error) => {
    console.log("Logout failed. " + error.message);
    Alert.alert("Logout failed. " + error.message);
  })
}