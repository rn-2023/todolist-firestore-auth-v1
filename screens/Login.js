import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable } from 'react-native';
import { logout, signIn } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';

export default function Login({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  const handlePressLogin = () => {
    if (!email) {
      Alert.alert('Email is required');
    } else if (!password) {
      Alert.alert('Password is required');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail('');
          setPassword('');
          // Navigation to Todos screen... comes in the next part
        }
      });
    }
  }

  const handlePressLogout = () => {
    logout();
  }

  if (isLoggedIn) {
    return(
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}> Todos: Login</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in. Go to your todos...
        </Text>
      </View>
    )
  }
  else {
    return(
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todos: Login</Text>
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.buttonStyle}>
          <Button 
            title="Login"
            onPress={handlePressLogin}
          />
        </Pressable>
        <Text style={styles.infoText}>Not having account yet?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button 
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </Pressable>
      </View>
    )
  }
}