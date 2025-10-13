import { walletStyles } from '@/styles/tabs.styles'
import React from 'react'
import { View, Text } from 'react-native'

export default function SavingsScreen() {
  return (
    <View style={walletStyles.basicContainer}>
      <View className="OverviewContainer"style={walletStyles.verticalContainer}>
        <Text style={walletStyles.fundsText}>Saver Funds</Text>
        <Text style={walletStyles.funds}>$14509.90</Text>
        <View className="MoneyBreakdown" style={walletStyles.horizontalContainer}>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}>$140.56 AUD</Text>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}>$445.49 PYUSD</Text>
        </View>
      </View>
      
      {/* <Text>Spending</Text> */}
    </View>
  )
}


