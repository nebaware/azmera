import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text>Welcome, admin! Here you can manage users, crops, and view analytics.</Text>
      {/* Add admin controls and analytics here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#388e3c' },
});
