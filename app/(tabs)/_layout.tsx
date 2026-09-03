import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#7C3AED",
            tabBarInactiveTintColor: "#B7A9C9",
            tabBarStyle: {
                height: 46 + insets.bottom,
                paddingBottom: insets.bottom,
                paddingTop: 8,
                borderTopWidth: 1.5,
                borderTopColor: "#EFE3F3",
            },
            tabBarLabelStyle: {
            fontSize: 10.5,
            fontWeight: "600",
            },
        }}>
            <Tabs.Screen name="homepage" options={{
                title: "Acceuil",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={25}></Ionicons>
                ),
            }}></Tabs.Screen>
            <Tabs.Screen name="planning" options={{
                title: "planning",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar-outline" color={color} size={25}></Ionicons>
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="profil" options={{
                title: "profil",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" color={color} size={25}></Ionicons>
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="addKid" options={{
                href: null,
            }}>
            </Tabs.Screen>
        </Tabs>
    )
}