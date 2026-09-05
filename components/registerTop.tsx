import "@/global.css"
import { Pressable, View, Text } from "react-native"

export function RegisterTop() {
    return (
        <View className="flex-row bg-lavender-pale rounded-full p-1.5 mt-6 self-center">
            <Pressable className="px-8 py-3.5 rounded-full justify-center">
                <Text className="font-bold text-ink-soft text-[15px]">
                    Connexion
                </Text>
            </Pressable>
            <Pressable className="px-8 py-3.5 rounded-full bg-white shadow-lg justify-center">
                <Text className="font-bold text-violet text-[15px]">
                    Inscription
                </Text>
            </Pressable>
        </View>
    )
}