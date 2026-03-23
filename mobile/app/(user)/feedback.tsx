import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

export default function Feedback() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    comments: ''
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.city || !formData.phone || !formData.comments) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await axios.post(`${API_URL}/feedback`, formData);
      Alert.alert('Success', 'Feedback submitted successfully!');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit feedback');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ 
        title: 'Feedback',
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
      }} />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name..."
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your City..."
          value={formData.city}
          onChangeText={(text) => setFormData({...formData, city: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Ph no."
          value={formData.phone}
          keyboardType="phone-pad"
          onChangeText={(text) => setFormData({...formData, phone: text})}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add Your Comments Here..."
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={formData.comments}
          onChangeText={(text) => setFormData({...formData, comments: text})}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SEND FEEDBACK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#F44336',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 0.48,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#4CAF50', // Both were green in screenshot
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  }
});
