import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Alert, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

const API_URL = 'https://price-6k5m.onrender.com/api';

export default function AdminHistory() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const resp = await axios.get(`${API_URL}/prices`);
      const reversed = [...(resp.data || [])].reverse();
      setPrices(reversed);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string, date: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to delete the price record for ${date}?`)) {
        deletePrice(id);
      }
    } else {
      Alert.alert(
        "Delete Record",
        `Are you sure you want to delete the price record for ${date}?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive", 
            onPress: () => deletePrice(id) 
          }
        ]
      );
    }
  };

  const deletePrice = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/prices/${id}`);
      Alert.alert('Success', 'Record deleted successfully');
      fetchPrices(); // Refresh list
    } catch (error) {
      Alert.alert('Error', 'Failed to delete record');
    }
  };

  if (loading) return <ActivityIndicator style={{marginTop: 50}} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Manage Past Prices',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 20 },
      }} />

      {prices.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>No historical prices found.</Text>
      ) : (
        <FlatList 
          data={prices}
          keyExtractor={item => item._id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardText}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.districtText}>{item.district}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => confirmDelete(item._id, item.date)}
              >
                <Text style={styles.deleteButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 4,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  districtText: {
    fontSize: 14,
    color: '#777',
  },
  deleteButton: {
    backgroundColor: '#D32F2F', // Red error color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
