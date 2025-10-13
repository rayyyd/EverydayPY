import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '@/constants/theme'

export default function _layout() {
  return (
    <Tabs
    screenOptions={{tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            height: 60,
            paddingBottom: 8,
        },
    }}
    >
        
        <Tabs.Screen name="home" options={{title: "Home",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="card-outline" color={color} size={SIZES.extraLarge} />
            ),
        }}/>
        <Tabs.Screen name="wallet" options={{title: "Wallet",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="wallet-outline" color={color} size={SIZES.extraLarge} />
            ),
        }}/>
        <Tabs.Screen name="profile" options={{title: "Profile",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={SIZES.extraLarge} />
            ),
        }}/>


    </Tabs>
  )
}