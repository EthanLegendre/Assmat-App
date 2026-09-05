import "@/global.css"
import { Pressable, View, Text, Image } from "react-native"

export function GoogleOrApple() {
    return (
        <View className="flex-column">
            <View className="flex-row items-center gap-3 mt-7">
                <View className="flex-1 h-[2px] bg-line" />
                <Text className="text-s text-ink-faint font-medium">ou continuer avec</Text>
                <View className="flex-1 h-[2px] bg-line" />
            </View>
            <View className="flex-row w-full items-center gap-6 justify-center">
                <Pressable className="flex-row h-15 gap-4 rounded-[17px] justify-center items-center mt-5 border-[1px] border-ink-faint w-40">
                    <Image source={require("@/assets/images/google_logo.png")} className="w-7 h-7"></Image>
                    <Text className="font-bold text-[14px]">
                        Google
                    </Text>
                </Pressable>
                <Pressable className="flex-row h-15 gap-4 rounded-[17px] justify-center items-center mt-5 border-[1px] border-ink-faint w-40">
                    <Image source={require("@/assets/images/logo-apple.png")} className="w-7 h-7"></Image>
                    <Text className="font-bold text-[14px]">
                        Apple
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}