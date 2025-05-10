import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BuyerDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buyer Dashboard</Text>
      <Text>Welcome, buyer! Here you can browse crops, make offers, and track your purchases.</Text>
      {/* Add buyer-specific actions here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#388e3c' },
});
