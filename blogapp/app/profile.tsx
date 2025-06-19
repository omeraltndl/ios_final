import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Image, ActivityIndicator, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'shared' | 'liked'>('shared');
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchUser = async () => {
        try {
            const email = await AsyncStorage.getItem('userEmail');
            if (!email) return;

            const res = await fetch(`http://10.116.35.35/get_user.php?email=${email}`);
            const data = await res.json();

            if (res.ok && data.user) {
                setUser(data.user);
                await fetchSharedPosts(data.user.email);
            }

        } catch (e) {
            console.error("Kullanıcı bilgisi alınamadı:", e);
        } finally {
            setLoading(false);
        }
    };
    const fetchSharedPosts = async (email: string) => {
        const res = await fetch(`http://10.116.35.35/get_user_posts.php?email=${email}`);
        const data = await res.json();
        console.log("Paylaşılanlar:", data);
        setPosts(data.posts || []);
    };

    const fetchLikedPosts = async (email: string) => {
        const res = await fetch(`http://10.116.35.35/get_liked_posts.php?email=${email}`);
        const data = await res.json();
        console.log("Beğenilenler:", data);
        setPosts(data.posts || []);
    };


    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Kullanıcı bilgisi bulunamadı.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>.</Text>
                <TouchableOpacity onPress={() => router.push('/update-profile')}>
                    <Text style={styles.updateButton}>Profili Güncelle</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: `http://10.116.35.35/${user.profile_picture}` }}
                    style={styles.avatar}
                />
                <Text style={styles.label}>Ad:</Text>
                <Text style={styles.value}>{user.name}</Text>

                <Text style={styles.label}>Soyad:</Text>
                <Text style={styles.value}>{user.surname}</Text>

                <Text style={styles.label}>E-posta:</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>Telefon:</Text>
                <Text style={styles.value}>{user.phone}</Text>

                {/* Sekme Butonları */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'shared' && styles.tabActive]}
                        onPress={() => {
                            setActiveTab('shared');
                            fetchSharedPosts(user.email);
                        }}
                    >
                        <Text style={styles.tabText}>Paylaşılanlar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'liked' && styles.tabActive]}
                        onPress={() => {
                            setActiveTab('liked');
                            fetchLikedPosts(user.email);
                        }}
                    >
                        <Text style={styles.tabText}>Beğenilenler</Text>
                    </TouchableOpacity>
                </View>

                {/* Postlar */}
                {posts.length === 0 ? (
                    <Text style={{ marginTop: 16, color: '#666' }}>Gösterilecek post bulunamadı.</Text>
                ) : (
                    posts.map((p, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.postCard}
                            onPress={() => router.push(`/post/${p.id}`)}
                        >
                            {p.picture && (
                                <Image
                                    source={{ uri: `http://10.116.35.35/uploads/${p.picture}` }}
                                    style={styles.postImage}
                                />
                            )}
                            <Text style={styles.postTitle}>{p.title}</Text>
                            <Text style={styles.postContent} numberOfLines={3}>{p.content}</Text>
                            <Text style={styles.postDate}>Tarih: {p.created_at}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center', backgroundColor: 'white' },
    avatar: {
        width: 120, height: 120, borderRadius: 60,
        marginBottom: 20, borderWidth: 2, borderColor: '#007AFF'
    },
    label: {
        fontSize: 14, color: '#888', marginTop: 12,
    },
    value: {
        fontSize: 18, fontWeight: 'bold', color: '#333',
    },
    error: { fontSize: 16, color: 'red' },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingBottom: 8,
    },
    tabButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#eee',
    },
    tabActive: {
        backgroundColor: '#007AFF',
    },
    tabText: {
        color: 'white',
        fontWeight: 'bold',
    },
    postCard: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 12,
        marginTop: 16,
        elevation: 2,
    },
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 8,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postContent: {
        fontSize: 14,
        color: '#444',
        marginTop: 6,
    },

    postDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    updateButton: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 14,
    },


});
