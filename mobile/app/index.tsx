import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Red Header Bar */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Market Price</Text>
        </View>

        <Image source={require('../assets/images/logo.png')} style={styles.headerImage} resizeMode="contain" />
        {/* Branding Section */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.instructionText}>Please select your role to continue</Text>

            <TouchableOpacity
              style={[styles.button, styles.userButton]}
              activeOpacity={0.8}
              onPress={() => router.push('/(user)/menu')}
            >
              <Text style={styles.buttonText}>I am a User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.adminButton]}
              activeOpacity={0.8}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={[styles.buttonText, styles.adminButtonText]}>I am an Admin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Stay Updated, Stay Informed.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F44336', // matches branding color
  },
  headerImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // off-white
  },
  headerBar: {
    height: 120,
    backgroundColor: '#F44336',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 40,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#333',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 35,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(244, 67, 54, 0.2)',
    elevation: 3,
  },
  userButton: {
    backgroundColor: '#F44336',
  },
  adminButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#F44336',
    boxShadow: 'none', // less shadow for the outline button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  adminButtonText: {
    color: '#F44336',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#AAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
