// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://10.116.35.35/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.status === 'Login successful') {
        // Başarılı
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userEmail', email);
        if (data.user_id) {
          await AsyncStorage.setItem('userId', String(data.user_id));
        }
        router.replace('/');
      } else {
        Alert.alert('Hata', data.error || 'Bilinmeyen bir hata oluştu.');
      }
    } catch (e) {
      Alert.alert('Hata', 'Bağlantı hatası: ' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        {loading
          ? <ActivityIndicator />
          : <Button title="Giriş Yap" onPress={loginUser} />
        }
      </View>
      <TouchableOpacity onPress={() => router.replace('/register')}>
        <Text style={styles.link}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:16 },
  title: { fontSize:24, fontWeight:'bold', color:'#007AFF', textAlign:'center', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:12, padding:12, marginBottom:10, backgroundColor:'#f9f9f9' },
  buttonContainer: { marginVertical:20 },
  link: { color:'#007AFF', textAlign:'center' },
});
