import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { homeStyles } from '@/styles/tabs.styles'
import { Ionicons } from '@expo/vector-icons'
import {router, Link} from "expo-router"

export default function Home() {
  return (
    
    <View style={homeStyles.container}>

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
            <Text style={homeStyles.funds}>$759.90</Text>
        </View>
        <View className="statsContainer"style={homeStyles.horizontalContainer}>
            <Link href="./wallet/spending" asChild>
                <Pressable
                    style={homeStyles.overviewCard}
                    android_ripple={{ color: '#e5e5e5' }}
                    accessibilityRole="button"
                >
                    <Text style={homeStyles.accountsNumber}>3 accounts</Text>
                    <Text style={homeStyles.accountsAmount}>$13990.90</Text>
                    <Text style={homeStyles.PYUSDAmount}>556.78$PY</Text>
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