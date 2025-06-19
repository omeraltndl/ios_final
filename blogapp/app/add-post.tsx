// app/add-post.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Image, Button,
  ScrollView, ActivityIndicator, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin gerekli', 'Fotoğraf galerisinden seçmek için izin vermelisiniz.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addPost = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    if (!userEmail) {
      Alert.alert('Hata', 'Kullanıcı e-postası bulunamadı.');
      return;
    }
    if (!title.trim() || !content.trim() || !imageUri) {
      Alert.alert('Hata', 'Tüm alanları doldurun ve bir görsel seçin.');
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      // @ts-ignore
      form.append('picture', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      form.append('user_email', userEmail);
      form.append('title', title.trim());
      form.append('content', content.trim());

      const response = await fetch('http://10.116.35.35/addPost.php', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: form,
      });
      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert('Başarılı', 'Post başarıyla eklendi.');
        router.back();
      } else {
        Alert.alert('Hata', data.message || 'Bir hata oluştu.');
      }
    } catch (e) {
      Alert.alert('Bağlantı hatası', String(e));
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Yeni Post Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="İçerik"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri
          ? <Image source={{ uri: imageUri }} style={styles.image} />
          : <Text style={styles.imagePlaceholder}>Fotoğraf Ekle</Text>
        }
      </TouchableOpacity>
      {uploading
        ? <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
        : <Button title="Postu Gönder" onPress={addPost} />
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 12, marginBottom: 16, backgroundColor: '#fff' },
  imagePicker: {
    height: 200, borderWidth: 1, borderColor: '#aaa',
    borderRadius: 12, backgroundColor: '#eee',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24, overflow: 'hidden'
  },
  imagePlaceholder: { color: '#555', fontSize: 16 },
  image: { width: '100%', height: '100%' },
});
