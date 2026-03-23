import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';

const API_URL = 'https://price-6k5m.onrender.com/api';

export default function UserPrices() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchPrices();
  }, [id]);

  const fetchPrices = async () => {
    try {
      const resp = await axios.get(`${API_URL}/prices`);
      if (resp.data && resp.data.length > 0) {
        if (id) {
          const item = resp.data.find((p: any) => p._id === id);
          setData(item || resp.data[0]);
        } else {
          setData(resp.data[0]);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{
        title: 'Price',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 20 },
      }} />

      {data ? (
        <>
          <Text style={styles.dateText}>Date : {data.date}</Text>

          <View style={styles.districtContainer}>
            <View style={styles.districtHeader}>
              <Text style={styles.districtTitle}>{data.district}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Broiler Price</Text>
              <View style={styles.boxesContainer}>
                {data.broiler?.map((price: number, index: number) => (
                  <View key={index} style={styles.priceBox}>
                    <Text style={styles.priceText}>{price}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Skin Chicken</Text>
              <View style={styles.boxesContainer}>
                <View style={styles.priceBox}>
                  <Text style={styles.priceText}>{data.skin}</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Skinless Chicken</Text>
              <View style={styles.boxesContainer}>
                <View style={styles.priceBox}>
                  <Text style={styles.priceText}>{data.skinless}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No prices available</Text>
      )}

      {/* Footer Image */}
      <View style={styles.footer}>
        <Image source={require('../../assets/images/chicken.png')} style={styles.chickenImage} resizeMode="contain" />
        <Text style={styles.footerText}>APFTWA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  districtContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
  },
  districtHeader: {
    backgroundColor: '#F44336',
    padding: 10,
  },
  districtTitle: {
    color: '#FFF',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // vertically center
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexWrap: 'wrap', // allow wrap if screen is very thin
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    minWidth: 100, // keep the text legible
    marginBottom: 4,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2, // give it slightly more width space to avoid cramping the 3 boxes
  },
  priceBox: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginLeft: 6,
    marginBottom: 4,
    minWidth: 45, // shrunk slightly to easily fit 3 on thin iPhones
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  chickenImage: {
    width: 200,
    height: 200,
  },
  footerText: {
    color: '#F44336',
    fontSize: 20,
    letterSpacing: 1,
    marginTop: 10,
  }
});
