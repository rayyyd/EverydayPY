import { walletStyles } from '@/styles/tabs.styles'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { demoRegistry, subscribeUIReload } from '@/server'
import { resolveWalletLogo } from '@/constants/wallet-logos'
import { WalletStatus } from '@/server/wallet'

// logo resolver moved to constants/wallet-logos

export default function SavingsScreen() {
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
  
  const savingsWallets = demoRegistry.listByStatus(WalletStatus.SAVINGS);
  const totalSavings = demoRegistry.getTotalSavings();
  return (
    <View style={[walletStyles.basicContainer]} key={`savings-${dataVersion}`}>
      {refreshing && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Refreshing…</Text>
        </View>
      )}
      <View className="OverviewContainer" style={[walletStyles.verticalContainer, {margin: 30}]}>
        <Text style={walletStyles.fundsText}>Savings</Text>
        <Text style={walletStyles.funds}>${totalSavings.toFixed(2)}</Text>
        <View className="MoneyBreakdown" style={walletStyles.horizontalContainer}>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}></Text>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}></Text>
        </View>
      </View>

      <View style={walletStyles.twoColRightFirst}>
        {savingsWallets.map((w) => {
          const balance = w.getBalance();
          return (
            <View className="SavingsWallet" key={w.getName()} style={walletStyles.OverviewCard}>
              <Text style={walletStyles.fundsText}>{w.getName()}</Text>
              <Image
                source={resolveWalletLogo(w.getLogoPath())}
                style={{ width: 90, height: 90, marginTop: 0, borderRadius: 8 }}
                resizeMode="contain"
              />
              <Text style={walletStyles.fundsText}>${balance.toFixed(2)}</Text>
            </View>
          );
        })}
        <View key={"add-wallet-savings"} style={walletStyles.OverviewCard}>
          <Text style={walletStyles.fundsText}>Add Wallet</Text>
          <Image
            source={require('@/assets/images/wallet-plus.png')}
            style={{ width: 90, height: 90, marginTop: 0, borderRadius: 8 }}
            resizeMode="contain"
          />
          <Text style={walletStyles.fundsText}></Text>
        </View>
      </View>
    </View>
  )
}


