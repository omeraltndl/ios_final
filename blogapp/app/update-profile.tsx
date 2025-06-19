import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function UpdateProfile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const fetchUser = async () => {
        const email = await AsyncStorage.getItem('userEmail');
        const res = await fetch(`http://10.116.35.35/get_user.php?email=${email}`);
        const data = await res.json();
        if (data.user) {
            setUser(data.user);
            setImage(`http://10.116.35.35/${data.user.profile_picture}`);
        }
        setLoading(false);
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert('Galeri izni gerekli!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
        }
    };

    const handleUpdate = async () => {
        setUpdating(true);
        const formData = new FormData();
        const originalEmail = await AsyncStorage.getItem('userEmail');
        formData.append('email', originalEmail || '');
        formData.append('newEmail', user.email);
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('phone', user.phone);
        if (image && !image.includes('http://10.116.35.35')) {
            const filename = image.split('/').pop();
            const match = /\.(\w+)$/.exec(filename ?? '');
            const type = match ? `image/${match[1]}` : `image`;
            formData.append('profile_picture', {
                uri: image,
                name: filename,
                type,
            } as any);
        }

        const res = await fetch('http://10.116.35.35/update_user.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const result = await res.json();
        setUpdating(false);

        if (result.success) {
            if (originalEmail !== user.email) {
                Alert.alert('Bilgi', 'E-posta adresiniz değişti. Lütfen tekrar giriş yapın.', [
                    {
                        text: 'Tamam',
                        onPress: async () => {
                            await AsyncStorage.removeItem('userEmail');
                            router.replace('/login'); // login ekranına yönlendir
                        }
                    }
                ]);
            } else {
                Alert.alert('Başarılı', 'Profil güncellendi.');
                router.back();
            }
        }

    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{ uri: image || 'https://via.placeholder.com/120' }}
                    style={styles.avatar}
                />
                <Text style={styles.imageHint}>Profil fotoğrafını değiştir</Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Ad"
                value={user.name}
                onChangeText={text => setUser({ ...user, name: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Soyad"
                value={user.surname}
                onChangeText={text => setUser({ ...user, surname: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Telefon"
                value={user.phone}
                onChangeText={text => setUser({ ...user, phone: text })}
                style={styles.input}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="E-posta"
                value={user.email}
                onChangeText={text => setUser({ ...user, email: text })}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />



            <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={updating}>
                <Text style={styles.buttonText}>{updating ? 'Güncelleniyor...' : 'Güncelle'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    avatar: {
        width: 120, height: 120, borderRadius: 60,
        marginBottom: 12, borderWidth: 2, borderColor: '#007AFF'
    },
    imageHint: {
        color: '#007AFF',
        marginBottom: 16,
        fontSize: 14,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
