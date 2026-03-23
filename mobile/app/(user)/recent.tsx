import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

const API_URL = 'https://price-6k5m.onrender.com/api';

export default function RecentPrices() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Price',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 20 },
      }} />

      <FlatList
        data={prices}
        keyExtractor={item => item._id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/(user)/prices', params: { id: item._id } })}
          >
            <Image source={require('../../assets/images/chicken.png')} style={styles.thumbnail} resizeMode="contain" />
            <View style={styles.cardText}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.districtText}>{item.district}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    elevation: 2, // shadow for android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#F44336', // matches their red icon background
  },
  cardText: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  districtText: {
    fontSize: 14,
    color: '#777',
  }
});
