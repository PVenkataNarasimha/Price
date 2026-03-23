import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);

  const [date, setDate] = useState('');
  const [district, setDistrict] = useState('Guntur District');
  const [broiler, setBroiler] = useState<string[]>(['', '', '']);
  const [skin, setSkin] = useState('');
  const [skinless, setSkinless] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const resp = await axios.get(`${API_URL}/prices`);
      if (resp.data && resp.data.length > 0) {
        const item = resp.data[0];
        setItemId(item._id);
        setDate(item.date || '');
        setDistrict(item.district || 'Guntur District');
        setBroiler(item.broiler?.map(String) || ['', '', '']);
        setSkin(item.skin?.toString() || '');
        setSkinless(item.skinless?.toString() || '');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!date) {
      Alert.alert('Error', 'Please enter a Date');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        date,
        district,
        broiler: broiler.map(p => parseFloat(p) || 0),
        skin: parseFloat(skin) || 0,
        skinless: parseFloat(skinless) || 0,
      };
      await axios.post(`${API_URL}/prices`, payload);
      Alert.alert('Success', 'Prices saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update prices');
    } finally {
      setSaving(false);
    }
  };

  const updateBroilerPrice = (text: string, index: number) => {
    const newBroiler = [...broiler];
    newBroiler[index] = text;
    setBroiler(newBroiler);
  };

  if (loading) return <ActivityIndicator style={{marginTop: 50}} />;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{
        title: 'Price - Admin',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 20 },
      }} />

      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Date : </Text>
        <TextInput 
          style={styles.dateInput}
          value={date}
          onChangeText={setDate}
          placeholder="e.g. 22/3/2026"
        />
      </View>

      <View style={styles.districtContainer}>
        <View style={styles.districtHeader}>
          <Text style={styles.districtTitle}>{district}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Broiler Price</Text>
          <View style={styles.boxesContainer}>
            {[0, 1, 2].map((index) => (
              <TextInput 
                key={index}
                style={styles.priceInput}
                value={broiler[index]}
                onChangeText={(text) => updateBroilerPrice(text, index)}
                keyboardType="numeric"
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Skin Chicken</Text>
          <View style={styles.boxesContainer}>
            <TextInput 
              style={styles.priceInput}
              value={skin}
              onChangeText={setSkin}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Skinless Chicken</Text>
          <View style={styles.boxesContainer}>
            <TextInput 
              style={styles.priceInput}
              value={skinless}
              onChangeText={setSkinless}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSave} 
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'SAVING...' : 'SAVE CHANGES'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.manageButton} 
        onPress={() => router.push('/(admin)/history' as any)} 
      >
        <Text style={styles.manageButtonText}>
          MANAGE PAST PRICES
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.manageButton, { backgroundColor: '#B71C1C' }]} 
        onPress={() => router.push('/(admin)/feedback')} 
      >
        <Text style={styles.manageButtonText}>
          VIEW USER FEEDBACK
        </Text>
      </TouchableOpacity>

      {/* Footer Image */}
      <View style={styles.footer}>
        <Image source={require('../../assets/images/chicken.png')} style={styles.chickenImage} resizeMode="contain" />
        <Text style={styles.footerText}>Price</Text>
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  dateInput: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    minWidth: 100,
    paddingVertical: 2,
  },
  districtContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3,
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
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    minWidth: 100,
    marginBottom: 4,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginLeft: 6,
    marginBottom: 4,
    minWidth: 45,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  manageButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  manageButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
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
