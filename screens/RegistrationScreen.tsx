import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface RegistrationScreenProps {
  navigation: any;
}

export default function RegistrationScreen({ navigation }: RegistrationScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username.match(/^[a-zA-Z0-9_]{4,}$/)) {
      Alert.alert('Invalid Username', 'Username must be at least 4 characters and contain only letters, numbers, or underscores.');
      return false;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://your-backend.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        Alert.alert('Registration Successful', data.message || 'A verification email has been sent to your address. Please verify to log in.');
        navigation.goBack();
      } else {
        Alert.alert('Registration Failed', data.error || 'An error occurred.');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Network Error', 'Could not connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title={loading ? 'Registering...' : 'Register'} onPress={handleRegister} disabled={loading} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
      <Text style={styles.info}>* A verification email will be sent to your address.</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, color: '#388e3c' },
  input: { width: '100%', maxWidth: 320, backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  info: { marginTop: 16, color: '#888', fontSize: 12, textAlign: 'center' },
});
