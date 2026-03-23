import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Please select your role</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.userButton]}
        onPress={() => router.push('/(user)/menu')}
      >
        <Text style={styles.buttonText}>I am a User</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.adminButton]}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={[styles.buttonText, styles.adminButtonText]}>I am an Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6', // off-white
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userButton: {
    backgroundColor: '#F44336', 
  },
  adminButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#F44336',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  adminButtonText: {
    color: '#F44336',
  },
});
