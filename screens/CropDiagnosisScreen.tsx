import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';

export default function CropDiagnosisScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const diagnose = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://your-backend.com/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input }),
      });
      const data = await response.json();
      setResult(data.diagnosis || 'No major issues detected.');
    } catch (err) {
      setResult('Failed to get diagnosis.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Crop Diagnosis</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe symptoms or paste image URL"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Diagnose" onPress={diagnose} disabled={loading || !input.trim()} />
      {loading && <ActivityIndicator style={styles.loading} size="large" color="#4CAF50" />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#222', textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  result: { marginTop: 24, fontSize: 18, color: '#388e3c', textAlign: 'center', fontWeight: '600' },
  loading: { marginTop: 20 },
});
