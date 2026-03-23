import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

import { API_URL } from '../../constants/API';

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
            <Image source={require('../../assets/images/logo.png')} style={styles.thumbnail} resizeMode="contain" />
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
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    elevation: 2, // shadow for android
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#F44336', // matches their red icon background
    borderRadius: 10,
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
  },
  headerImageContainer: {
    height: 180,
    backgroundColor: '#F44336',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: '90%',
  }
});
