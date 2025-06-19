import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, StyleSheet, ActivityIndicator,
    ScrollView, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetail() {
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const router = useRouter();

    const [liked, setLiked] = useState(false);
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [sending, setSending] = useState(false);

    // POST detayını çek
    const fetchPost = async () => {
        try {
            const response = await fetch(`http://10.116.35.35/getPostDetails.php?id=${id}`);
            const data = await response.json();
            if (response.ok && data.post) {
                setPost(data.post);
            } else {
                setPost(null);
            }
        } catch (e) {
            console.error('Post çekme hatası:', e);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    // Yorumları çek
    const fetchComments = async () => {
        try {
            const res = await fetch(`http://10.116.35.35/getComments.php?id=${id}`);
            const json = await res.json();
            if (Array.isArray(json.comments)) {
                setComments(json.comments);
            } else {
                setComments([]);
            }
        } catch (e) {
            console.error('Yorum çekme hatası:', e);
            setComments([]);
        }
    };

    const submitComment = async () => {
        if (!newComment.trim()) return;
        setSending(true);
        try {
            const email = await AsyncStorage.getItem('userEmail');
            const res = await fetch(`http://10.116.35.35/addComment.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: id,
                    user_email: email,
                    content: newComment.trim(),
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setNewComment('');
                fetchComments(); // yorumları yeniden yükle
            }
        } catch (e) {
            console.error('Yorum gönderme hatası:', e);
        } finally {
            setSending(false);
        }
    };

    const toggleLike = async () => {
        try {
            const email = await AsyncStorage.getItem('userEmail');
            const res = await fetch(`http://10.116.35.35/toggleLike.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: id,
                    user_email: email
                })
            });
            const json = await res.json();
            if (json.success) {
                setLiked(!liked);
            }
        } catch (e) {
            console.error('Beğeni değiştirilemedi:', e);
        }
    };

    useEffect(() => {
        const checkLike = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                const res = await fetch(`http://10.116.35.35/checkLike.php?post_id=${id}&user_email=${email}`);
                const json = await res.json();
                setLiked(json.liked === true);
            } catch (e) {
                console.error('Beğeni kontrol hatası:', e);
            }
        };

        fetchPost();
        fetchComments();
        checkLike();
    }, [id]);

    if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
    if (!post) return (
        <View style={styles.container}>
            <Text style={styles.error}>Post bulunamadı.</Text>
            <Button title="Geri Dön" onPress={() => router.back()} />
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                {post.picture && (
                    <Image
                        source={{ uri: `http://10.116.35.35/uploads/${post.picture}` }}
                        style={styles.image}
                    />
                )}
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.meta}>Yazan: {post.user_email}</Text>
                <Text style={styles.meta}>Tarih: {post.created_at}</Text>
                <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
                    <Text style={[styles.likeText, { color: liked ? '#007AFF' : '#888' }]}>
                        {liked ? '❤️ Beğenildi' : '🤍 Beğen'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.content}>{post.content}</Text>

                <Text style={styles.commentTitle}>Yorumlar</Text>
                {comments.length === 0 ? (
                    <Text style={styles.noComments}>Henüz yorum yapılmamış.</Text>
                ) : (
                    comments.map((c, i) => (
                        <View key={i} style={styles.commentBox}>
                            <Text style={styles.commentUser}>{c.user_email}</Text>
                            <Text style={styles.commentText}>{c.content}</Text>
                        </View>
                    ))
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Yorum yaz..."
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submitComment}
                        disabled={sending}
                    >
                        <Text style={styles.buttonText}>{sending ? '...' : 'Gönder'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: 'white', flexGrow: 1 },
    image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
    meta: { fontSize: 14, color: '#555', marginBottom: 4 },
    content: { fontSize: 16, color: '#333', marginTop: 12 },
    error: { textAlign: 'center', fontSize: 16, marginBottom: 20 },
    commentTitle: { marginTop: 30, fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    noComments: { color: '#999', fontStyle: 'italic', marginBottom: 12 },
    commentBox: { marginBottom: 12, backgroundColor: '#f2f2f2', padding: 10, borderRadius: 8 },
    commentUser: { fontWeight: 'bold', marginBottom: 4, color: '#007AFF' },
    commentText: { color: '#333' },
    inputContainer: { marginTop: 16 },
    input: {
        borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
        padding: 10, minHeight: 50, backgroundColor: '#fff', marginBottom: 10
    },
    button: {
        backgroundColor: '#007AFF', paddingVertical: 10,
        borderRadius: 8, alignItems: 'center'
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    likeButton: {
        marginTop: 12,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    likeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
