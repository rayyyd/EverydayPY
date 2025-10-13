import { View, Text, Image } from 'react-native'
import React from 'react'
import { homeStyles } from '@/styles/tabs.styles'
import { Ionicons } from '@expo/vector-icons'

export default function Home() {
  return (
    
    <View style={homeStyles.container}>
        <View style={homeStyles.header}>
            <Ionicons name="rocket-outline" size={24} color="black" />
            <Ionicons name="scan-outline" size={22} color="black" style={homeStyles.headerRight} />
            <Ionicons name="qr-code-outline" size={22} color="black" style={homeStyles.headerLeft} />
        </View>
        <View className="cardContainer" style={homeStyles.basicContainer}>
        {/* Display the sample-credit-card.png image from the assets folder */}
        <Image 
            source={require('@/assets/images/sample-credit-card.png')} 
            style={{ width: 400, height: 175, borderRadius: 16 }}
            resizeMode="cover"
        />
            <View style={homeStyles.inlineRow}>
                <Ionicons name="radio-outline" size={16} color="black" />
                <Text style={homeStyles.tapToPay}> Tap to pay</Text>
                
            </View>
        </View>
        <View className="fundsContainer" style={homeStyles.fundsContainer}>
            <Text style={homeStyles.fundsText}>Everyday Funds</Text>
            <Text style={homeStyles.funds}>$759.90</Text>
        </View>
        <View className="statsContainer"style={homeStyles.horizontalContainer}>
            <View className="accountsOverview" style={[homeStyles.verticalContainer, homeStyles.overviewContainer]}>
                <Text style={homeStyles.accountsNumber}>7 accounts</Text>
                <Text style={homeStyles.accountsAmount}>$13990.90</Text>
                <Image
                    source={require('@/assets/images/home-wallet-sample.png')}
                    style={{ width: 80, height: 40, marginTop: 12, borderRadius: 8 }}
                    resizeMode="contain"
                />
            </View>
            <View className="spendingOverview" style={[homeStyles.verticalContainer, homeStyles.overviewContainer]}>
                <Text style={homeStyles.accountsNumber}>Spending (Past 30 days)</Text>
                <Text style={homeStyles.accountsAmount}>$3342.90</Text>
                <Image
                    source={require('@/assets/images/home-spending-chart.png')}
                    style={{ width: 80, height: 40, marginTop: 12, borderRadius: 8 }}
                    resizeMode="contain"
                />
            </View>
        </View>
    </View>
  )
}