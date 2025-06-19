// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerUser = async () => {
    if (!name || !surname || !phone || !email || !password || !confirm) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    if (!/^[\w.+-]+@\w+\.\w+$/.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalı.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.116.35.35/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, phone, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.message === 'User registered successfully') {
        Alert.alert('Başarılı', 'Kayıt oluşturuldu.');
        router.replace('/login');
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
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput style={styles.input} placeholder="İsim" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Soyisim" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Telefon" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Şifreyi Doğrula" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <View style={styles.buttonContainer}>
        {loading
          ? <ActivityIndicator />
          : <Button title="Kayıt Ol" onPress={registerUser} />
        }
      </View>
      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.link}>Giriş Yap</Text>
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
