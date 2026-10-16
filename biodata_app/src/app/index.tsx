import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/AuthContext';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#047857" />
      </View>
    );
  }

  if (user) {
    return <Redirect href={'/(tabs)/home' as any} />;
  }

  return <Redirect href={'/(auth)/welcome' as any} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
