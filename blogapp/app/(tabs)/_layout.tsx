// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Slot, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const { pathname } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      const flag = await AsyncStorage.getItem('isLoggedIn');
      setLoggedIn(flag === 'true');
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Eğer kullanıcı girişliyse, login/register ekranlarına gitmesin
      if (isLoggedIn && (pathname === 'login' || pathname === 'register')) {
        router.replace('/');
      }
      // Girişli değilse, tab ekranlarına gitmesin
      if (!isLoggedIn && pathname !== 'login' && pathname !== 'register') {
        router.replace('/login');
      }
    }
  }, [loading, isLoggedIn, pathname]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
