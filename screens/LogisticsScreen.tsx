import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from 'react-native';

export default function LogisticsScreen() {
  const [pickup, setPickup] = useState('Farm Location');
  const [drop, setDrop] = useState('Nearest Market');
  const [crop, setCrop] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const requestTransport = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://your-backend.com/api/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickup, drop, crop, date }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        Alert.alert('Request Sent', data.message || 'A transport provider will contact you soon.');
      } else {
        Alert.alert('Error', data.error || 'Failed to request transport.');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Network Error', 'Could not connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logistics Coordination</Text>
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
      />
      <TextInput
        style={styles.input}
        placeholder="Drop Location"
        value={drop}
        onChangeText={setDrop}
      />
      <TextInput
        style={styles.input}
        placeholder="Crop & Quantity (e.g. Maize - 10 Qnt)"
        value={crop}
        onChangeText={setCrop}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Request Transport" onPress={requestTransport} disabled={loading || !pickup || !drop || !crop || !date} />
      {loading && <ActivityIndicator style={styles.loading} size="large" color="#4CAF50" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#222', textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  loading: { marginTop: 20 },
});
