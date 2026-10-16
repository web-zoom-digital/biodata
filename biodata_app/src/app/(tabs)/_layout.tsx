import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabIcon({
  name,
  focused,
  label,
  isCenter,
}: {
  name: string;
  focused: boolean;
  label: string;
  isCenter?: boolean;
}) {
  return (
    <View style={tabStyles.iconContainer}>
      {isCenter ? (
        <View style={[tabStyles.centerBadge, focused && tabStyles.centerBadgeActive]}>
          <Ionicons
            name={focused ? (name as any) : (`${name}-outline` as any)}
            size={20}
            color={focused ? '#FFFFFF' : '#047857'}
          />
        </View>
      ) : (
        <Ionicons
          name={focused ? (name as any) : (`${name}-outline` as any)}
          size={22}
          color={focused ? '#047857' : '#9CA3AF'}
        />
      )}
      <Text
        style={[
          tabStyles.label,
          focused && tabStyles.labelActive,
          isCenter && tabStyles.centerLabel,
          isCenter && focused && tabStyles.centerLabelActive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 60 + Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 0),
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 4),
          paddingTop: 6,
          ...Platform.select({
            android: { elevation: 8 },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
          }),
        },
        tabBarActiveTintColor: '#047857',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      {/* 1. Home (Left) */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} label="Home" />
          ),
        }}
      />

      {/* 2. My Bio Data (Center) */}
      <Tabs.Screen
        name="my-biodatas"
        options={{
          title: 'My Bio Data',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="document-text"
              focused={focused}
              label="My Bio Data"
              isCenter
            />
          ),
        }}
      />

      {/* 3. Profile (Right) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person" focused={focused} label="Profile" />
          ),
        }}
      />

      {/* Hidden from tab bar — accessible only via programmatic navigation */}
      <Tabs.Screen
        name="templates"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 74,
  },
  centerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  centerBadgeActive: {
    backgroundColor: '#047857',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 2,
  },
  labelActive: {
    color: '#047857',
    fontWeight: '700',
  },
  centerLabel: {
    fontWeight: '600',
    color: '#047857',
  },
  centerLabelActive: {
    color: '#047857',
    fontWeight: '800',
  },
});
