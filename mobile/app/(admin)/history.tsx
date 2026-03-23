import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Alert, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

import { API_URL } from '../../constants/API';

export default function AdminHistory() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => setExpandedId(expandedId === item._id ? null : item._id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
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

              {expandedId === item._id && (
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Broiler Price:</Text>
                    <Text style={styles.detailValue}>{item.broiler?.join(', ') || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Skin Chicken:</Text>
                    <Text style={styles.detailValue}>{item.skin || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Skinless Chicken:</Text>
                    <Text style={styles.detailValue}>{item.skinless || 'N/A'}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
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
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 4,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  cardHeader: {
    flexDirection: 'row',
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
  },
  detailsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  }
});
