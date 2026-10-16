
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LoadingScreen } from '@/components/LoadingScreen';

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !user) {
      const t = setTimeout(() => {
        router.replace('/(auth)/welcome' as any);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <LoadingScreen
        message="Restoring your session..."
        subMessage="BioCraft is getting you set up."
        timeoutSeconds={10}
        onTimeout={() => {
          SplashScreen.hideAsync().catch(() => {});
        }}
      />
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade' }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />

      <Stack.Screen name="create" options={{ headerShown: false, animation: 'slide_from_bottom' }} />

      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
