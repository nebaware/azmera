import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Example: fetch user profile from backend (replace with your endpoint)
    AsyncStorage.getItem('azmera_token').then(token => {
      fetch('https://your-backend.com/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setName(data.name);
          setEmail(data.email);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Error', 'Failed to load profile');
        });
    });
  }, []);

  const handleSave = () => {
    setLoading(true);
    AsyncStorage.getItem('azmera_token').then(token => {
      fetch('https://your-backend.com/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name, email }),
      })
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setEditMode(false);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Error', 'Failed to update profile');
        });
    });
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4CAF50" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      {editMode ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setEditMode(false)} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Name: {profile?.name}</Text>
          <Text style={styles.label}>Email: {profile?.email}</Text>
          <Button title="Edit Profile" onPress={() => setEditMode(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, color: '#388e3c' },
  label: { fontSize: 18, marginBottom: 12 },
  input: { width: '100%', maxWidth: 320, backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
});
