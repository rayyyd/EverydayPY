import { Stack, Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
          <Stack
            screenOptions={{
              headerShown: true,
              header: () => (
                <SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
                  <View style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="rocket-outline" size={24} color="black" />
                    <Link href="/scan" asChild>
                      <Pressable style={{ position: 'absolute', right: 12 }} accessibilityRole="button">
                        <Ionicons name="scan-outline" size={22} color="black" />
                      </Pressable>
                    </Link>
                  </View>
                </SafeAreaView>
              ),
            }}
          />

      </SafeAreaView>
    </SafeAreaProvider>
  )
}
