import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { inflate, getConversionRate, resetInflation, subscribeUIReload } from '@/server'

export default function Profile() {
  const [rateInput, setRateInput] = useState<string>("1.00")
  const [currentRate, setCurrentRate] = useState<number>(getConversionRate())

  const handleInflate = () => {
    const parsed = parseFloat(rateInput)
    if (!isNaN(parsed) && parsed > 0) {
      inflate(parsed)
      setRateInput("")
      // Current rate will update via subscription
    }
  }

  const handleReset = () => {
    resetInflation()
    setRateInput("")
    // Current rate will update via subscription
  }

  useEffect(() => {
    setCurrentRate(getConversionRate())
    // Subscribe to updates so current rate stays in sync
    const unsubscribe = subscribeUIReload(() => {
      setCurrentRate(getConversionRate())
    })
    return unsubscribe
  }, [])

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 8 }}>Inflation rate (e.g. 1.05)</Text>
      <Text style={{ marginBottom: 8 }}>Current rate: {currentRate.toFixed(4)}</Text>
      <TextInput
        value={rateInput}
        onChangeText={setRateInput}
        keyboardType="decimal-pad"
        placeholder="1.05"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 6,
          marginBottom: 12,
        }}
      />
      <Pressable
        onPress={handleInflate}
        android_ripple={{ color: '#e5e5e5' }}
        style={{
          backgroundColor: '#0a7ea4',
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 6,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Apply Inflation</Text>
      </Pressable>

      <Pressable
        onPress={handleReset}
        android_ripple={{ color: '#e5e5e5' }}
        style={{
          backgroundColor: '#999',
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginTop: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Reset Inflation</Text>
      </Pressable>
    </View>
  )
}