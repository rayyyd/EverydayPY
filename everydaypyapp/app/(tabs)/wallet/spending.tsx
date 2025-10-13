import { walletStyles } from '@/styles/tabs.styles'
import React from 'react'
import { View, Text } from 'react-native'

export default function SpendingScreen() {
  return (
    <View style={walletStyles.basicContainer}>
      <View className="OverviewContainer"style={walletStyles.verticalContainer}>
        <Text style={walletStyles.fundsText}>Everyday Funds</Text>
        <Text style={walletStyles.funds}>$759.90</Text>
        <View className="MoneyBreakdown" style={walletStyles.horizontalContainer}>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}></Text>
            <Text style={[walletStyles.fundsText, {marginLeft: 10, marginRight: 10}]}></Text>
        </View>
      </View>
      
      {/* <Text>Spending</Text> */}
    </View>
  )
}


