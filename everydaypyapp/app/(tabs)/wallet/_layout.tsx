import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { Tabs, Link, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '@/constants/theme'
import { walletStyles } from '@/styles/tabs.styles'

function WalletHeader() {
  const pathname = usePathname()
  const isWalletRoot = pathname === '/wallet' || pathname?.endsWith('/wallet')
  const isSpending = isWalletRoot || pathname?.includes('/spending')
  const isSavings = pathname?.includes('/savings')
  
  return (
    <View style={{ paddingTop: 8, paddingBottom: 8, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>


      {/* Top-aligned tabs (text only) */}
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingTop: 6 }}>
        <Link href="/wallet/spending" asChild>
          <Pressable
            accessibilityRole="button"
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 999,
              backgroundColor: isSpending ? COLORS.primary + '22' : 'transparent',
              borderWidth: isSpending ? 1 : 0,
              borderColor: isSpending ? COLORS.primary : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: SIZES.small,
                color: isSpending ? COLORS.primary : 'black',
                fontWeight: isSpending ? '700' : '500',
              }}
            >
              Spending
            </Text>
          </Pressable>
        </Link>

        <Link href="/wallet/savings" asChild>
          <Pressable
            accessibilityRole="button"
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 999,
              backgroundColor: isSavings ? COLORS.primary + '22' : 'transparent',
              borderWidth: isSavings ? 1 : 0,
              borderColor: isSavings ? COLORS.primary : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: SIZES.small,
                color: isSavings ? COLORS.primary : 'black',
                fontWeight: isSavings ? '700' : '500',
              }}
            >
              Savings
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

export default function WalletTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <WalletHeader />,
      }}
      // hide the default bottom tab bar; we render a custom top bar in the header
      tabBar={() => null}
    >
      <Tabs.Screen name="spending" options={{ title: 'Spending' }} />
      <Tabs.Screen name="savings" options={{ title: 'Savings' }} />
    </Tabs>
  )
}


