import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SearchResults() {
  const { q } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!q) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(`http://10.116.35.35/searchPosts.php?q=${encodeURIComponent(q as string)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (e) {
        console.error("Arama hatası:", e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/post/[id]',
          params: { id: item.id.toString() },
        })
      }
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
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postEmail}>{item.user_email}</Text>
        <Text style={styles.postDate}>Oluşturulma: {item.created_at}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <Text style={styles.title}>“{q}” araması sonuçları:</Text>
      {posts.length === 0 ? (
        <Text style={styles.noResults}>Sonuç bulunamadı.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    color: '#007AFF',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
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
});
