// app/(tabs)/index.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');

  // Sunucudan postları çek
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://10.116.35.35/getPosts.php');
      if (res.ok) {
        const json = await res.json();
        setPosts(Array.isArray(json.posts) ? json.posts : []);
      } else {
        setPosts([]);
      }
    } catch (e) {
      console.error('Fetch error', e);
      setPosts([]);
    }
  };

  // İlk yükleme
  useEffect(() => {
    (async () => {
      await fetchPosts();
      setLoading(false);
    })();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  // Çıkış fonksiyonu
  const logout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  // Liste item render
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        console.log("Gönderilen item:", item); // ← BURASI
        router.push({
          pathname: '/post/[id]',
          params: { id: item.id.toString() },
        });
      }}
    >

      {item.picture ? (
        <Image
          source={{ uri: `http://10.116.35.35/uploads/${item.picture}` }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>Görsel Yok</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.postTitle}>{item.title || 'Başlık Yok'}</Text>
        <Text style={styles.postEmail}>{item.user_email || 'E-posta Yok'}</Text>
        <Text style={styles.postDate}>
          Oluşturulma: {item.created_at || 'Tarih Yok'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>Ana Sayfa</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={26} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <AntDesign name="logout" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>


      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Başlığa göre ara..."
          returnKeyType="search"
          onSubmitEditing={() => {
            if (query.trim()) {
              router.push({
                pathname: '/search/[q]',
                params: { q: query.trim() },
              });
              setQuery('');
            }
          }}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Post Listesi */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : posts.length === 0 ? (
        <Text style={styles.noPosts}>Gösterilecek bir post bulunamadı.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      {/* Add Post Butonu */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-post')}
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  appBar: {
    height: 56,
    backgroundColor: 'white',
    elevation: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    elevation: 2,
  },
  searchInput: { flex: 1, height: 40 },
  noPosts: { textAlign: 'center', marginTop: 20, color: '#555' },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: width - 24,
    height: 200,
  },
  noImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: { color: '#666' },
  cardContent: { padding: 12 },
  postTitle: { fontSize: 18, fontWeight: 'bold' },
  postEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  postDate: { fontSize: 12, color: '#999', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
