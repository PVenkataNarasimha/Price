import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function UserGuide() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ 
        title: 'Price', // Matches the red header title in previous screens
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
      }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>User Guide</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Market Rates are updated every day after 2.00 pm fetching for previous date.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            If there is no change in the next day rates, there will be no update.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  cardHeader: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardHeaderTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
