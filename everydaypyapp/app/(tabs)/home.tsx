import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { homeStyles } from '@/styles/tabs.styles'
import { Ionicons } from '@expo/vector-icons'
import {router, Link} from "expo-router"
import { demoRegistry, subscribeUIReload } from '@/server'
import { CashToPYUSD } from '@/server/PYUSD'
import { WalletStatus } from '@/server/wallet'

export default function Home() {
  const [refreshing, setRefreshing] = useState(false)
  const [dataVersion, setDataVersion] = useState(0)

  useEffect(() => {
    const onReload = () => {
      setRefreshing(true)
      setDataVersion(v => v + 1) // Force re-render by updating state
      setTimeout(() => setRefreshing(false), 350)
    }
    const offUi = subscribeUIReload(onReload)
    const offRegistry = demoRegistry.subscribeChange(onReload)
    return () => {
      offUi()
      offRegistry()
    }
  }, [])

  // Read data into local variables during render to ensure fresh values
  const everydaySpendingBalance = demoRegistry.accessWallet('Everyday Spending')?.getBalance() ?? 0;
  const totalBalance = demoRegistry.getBalance();
  const totalBalancePYUSD = CashToPYUSD(totalBalance);

  return (
    
    <View style={homeStyles.container} key={`home-${dataVersion}`}>
        {refreshing && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Refreshing…</Text>
          </View>
        )}

        <View className="cardContainer" style={homeStyles.basicContainer}>
        {/* Display the sample-credit-card.png image from the assets folder */}
        <Image 
            source={require('@/assets/images/sample-credit-card.png')} 
            style={{ width: 350, height: 150, borderRadius: 16 }}
            resizeMode="cover"
        />
            <View style={homeStyles.inlineRow}>
                <Ionicons name="radio-outline" size={12} color="black" />
                <Text style={homeStyles.tapToPay}> Tap to pay</Text>
                
            </View>
        </View>
        <View className="fundsContainer" style={homeStyles.fundsContainer}>
            <Text style={homeStyles.fundsText}>Everyday Funds</Text>
            <Text style={homeStyles.funds}>${everydaySpendingBalance.toFixed(2)}</Text>
        </View>
        <View className="statsContainer"style={homeStyles.horizontalContainer}>
            <Link href="./wallet/spending" asChild>
                <Pressable
                    style={homeStyles.overviewCard}
                    android_ripple={{ color: '#e5e5e5' }}
                    accessibilityRole="button"
                >
                    <Text style={homeStyles.accountsNumber}>3 accounts</Text>
                    <Text style={homeStyles.accountsAmount}>${totalBalance.toFixed(2)}</Text>
                    <Text style={homeStyles.PYUSDAmount}>{totalBalancePYUSD.toFixed(2)} USD</Text>
                    <Image
                    source={require('@/assets/images/home-wallet-sample.png')}
                    style={{ width: 100, height: 100, marginTop: 12, borderRadius: 8 }}
                    resizeMode="contain"
                    />
                </Pressable>
            </Link>
            <View style={homeStyles.overviewCard}>
                <Text style={homeStyles.accountsNumber}>Spending (Past 30 days)</Text>
                <Text style={homeStyles.accountsAmount}>$3342.90</Text>
                <Text style={homeStyles.PYUSDAmount}></Text>
                <Image
                    source={require('@/assets/images/home-spending-chart.png')}
                    style={{ width: 90, height: 90, marginTop: 12, borderRadius: 8 }}
                    resizeMode="contain"
                />
            </View>
        </View>
        <View className="QrContainer" style={homeStyles.basicContainer}>
            <Image source={require('@/assets/images/home-qr-sample.png')} style={{ width: 175, height: 175, borderRadius: 8 }} resizeMode="contain" />
            <Link href={"../(hidden)/pay-options"} style={[homeStyles.fundsText, { marginTop: 15 }]}>Other Payment Options</Link>
        </View>
    </View>
  )
}