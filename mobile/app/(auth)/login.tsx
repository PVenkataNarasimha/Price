import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Stack } from 'expo-router';
import axios from 'axios';

import { API_URL } from '../../constants/API';

// Redirection is handled globally by AuthContext.tsx useEffect
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      await signIn(response.data);
    } catch (error: any) {
      if (Platform.OS === 'web') {
        window.alert(error.response?.data?.message || 'Login Failed');
      } else {
        Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Price Login',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
      }} />

      <Text style={styles.title}>Price Manager App</Text>
      
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          placeholderTextColor="#999"
          value={username} 
          onChangeText={setUsername} 
          autoCapitalize="none" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#999"
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'LOGGING IN...' : 'LOGIN'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FAF9F6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#F44336' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 8, elevation: 3, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 5, fontSize: 16, color: '#000' },
  loginButton: { backgroundColor: '#F44336', paddingVertical: 15, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
