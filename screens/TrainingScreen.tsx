import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

interface TrainingModule {
  id: string;
  title: string;
  progress: number;
}

export default function TrainingScreen() {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch training modules from backend
    fetch('https://your-backend.com/api/training')
      .then(res => res.json())
      .then(data => {
        setModules(data.modules || []);
        setLoading(false);
      })
      .catch(() => {
        setModules([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gamified Training</Text>
      <FlatList
        data={modules}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.moduleTitle}>{item.title}</Text>
            <Text style={styles.progress}>Progress: {item.progress}%</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start Module</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  moduleTitle: { fontSize: 18, fontWeight: '600', color: '#388e3c' },
  progress: { fontSize: 14, color: '#666', marginTop: 4 },
  button: { marginTop: 12, backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingBottom: 24 },
});
